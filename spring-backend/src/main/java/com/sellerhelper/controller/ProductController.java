package com.sellerhelper.controller;

import com.sellerhelper.constant.ErrorMessage;
import com.sellerhelper.constant.ResourceNotFoundException;
import com.sellerhelper.constant.ValidationException;
import com.sellerhelper.entity.ProductEntity;
import com.sellerhelper.service.HolidayHelper;
import com.sellerhelper.service.ProductService;
import com.sellerhelper.validator.ProductValidator;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    ProductValidator productValidator;
    @Autowired
    HolidayHelper holidayHelper;

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping(value="/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getAllProducts(){
        List<ProductEntity> productList = productService.getAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(new JSONArray(productList).toString(4));
    }

    @GetMapping(value="/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getProductById(@PathVariable String id){
        ProductEntity product = productService.getProductById(id);
        if (product != null){
            return ResponseEntity.status(HttpStatus.OK).body(new JSONObject(product).toString(4));
        } else {
            String msg = ErrorMessage.RESOURCE_NOT_FOUND.getMessage() + "\n";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

    }

    @GetMapping(value="/shipping-date/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getShippingDate(@PathVariable String id){
        try {
            LocalDate date = productService.calculateShipDateById(id);
            return ResponseEntity.ok(date.toString());
        } catch (ResourceNotFoundException e1){
            String errorMsg = e1.getMessage() + "\n";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg);
        }
    }

    @GetMapping(value="/shipping-date")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getShippingDateByPurchaseDate(@RequestParam("purchaseDate") String purchaseDate,
                                                                @RequestParam("maxDaysToShip") String maxDaysToShip ,
                                                                @RequestParam("shipOnWeekends") String shipOnWeekends){
        try {
            LocalDate date = productService.calculateShipDateByPurchaseDate(purchaseDate,
                    Integer.parseInt(maxDaysToShip),
                    Boolean.parseBoolean(shipOnWeekends),
                    holidayHelper);
            return ResponseEntity.ok(date.toString());
        } catch (Exception e1){
            String errorMsg = e1.getMessage() + "\n";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsg);
        }
    }

    @PostMapping(value="/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createProduct(@RequestBody String request) {
        try {
            logger.debug("request received: " + request);
            productValidator.validateInput(request);
            ProductEntity product = productService.saveProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(new JSONObject(product).toString(4));
        } catch (Exception e) {
            logger.debug("exception found: " + e);
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping(value="/create-batch")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createProducts(@RequestBody String request) {
        JSONArray productsJsonArray = new JSONArray(request);
        List<String> createdProductList = new ArrayList<>();

        for(int i=0; i<productsJsonArray.length(); i++){
            JSONObject product = productsJsonArray.getJSONObject(i);
            String createdProduct = createProduct(product.toString()).getBody();
            createdProductList.add(createdProduct);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new JSONArray(createdProductList).toString(4));
    }

    private List<String> getTraditionalUsHolidays() {
        return holidayHelper.getUsTraditionalHolidays();
    }

    private List<String> getUserDefinedHolidays() {
        return holidayHelper.getUserDefinedHolidays();
    }

    @GetMapping(value = "/get-all-holidays")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getAllHolidays() {
        JSONObject res = new JSONObject();
        res.put("us", getTraditionalUsHolidays());
        res.put("mfr", getUserDefinedHolidays());

        return ResponseEntity.ok(res.toString(4));
    }

    @PostMapping(value = "/set-user-holidays")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> setUserDefinedHolidays(@RequestBody String request) {
        if(request == null || request.isEmpty()){
            throw new ValidationException(String.format(ErrorMessage.INVALID_DATE_FORMAT.getMessage(), ""));
        }
        try {
            List<String> validDates = new ArrayList<>();
            for(String s : request.strip().split(",")){
                holidayHelper.validateDateFormat(s);
                validDates.add(s);
            }
            holidayHelper.setUserDefinedHolidays(validDates);
            return ResponseEntity.ok(holidayHelper.getUserDefinedHolidays().toString());
        } catch (ValidationException validationException){
            return ResponseEntity.badRequest().body(validationException.getMessage());
        } catch (RuntimeException runtimeException){
            return ResponseEntity.internalServerError().body(ErrorMessage.INTERNAL_SERVER_ERROR.getMessage());
        }
    }
    @GetMapping(value = "/holiday-test")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> isHoliday(@RequestBody String request) {
        try {
            List<String> holidays = new ArrayList<>();
            List<String> nonHolidays = new ArrayList<>();
            for(String s : request.strip().split(",")){
                holidayHelper.validateDateFormat(s);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
                LocalDate localDate = LocalDate.parse(s, formatter);

                if(holidayHelper.isHoliday(localDate)){
                    holidays.add(s);
                }else{
                    nonHolidays.add(s);
                }
            }
            JSONObject json = new JSONObject();
            json.put("validHolidays", holidays.toString());
            json.put("notHolidays", nonHolidays.toString());
            return ResponseEntity.ok().body(json.toString(4));
        } catch (ValidationException validationException){
            return ResponseEntity.badRequest().body(validationException.getMessage());
        }
    }
}
