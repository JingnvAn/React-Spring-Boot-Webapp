package com.sellerhelper.controller;

import com.sellerhelper.constant.ErrorMessage;
import com.sellerhelper.constant.ResourceNotFoundException;
import com.sellerhelper.entity.ProductEntity;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    ProductValidator productValidator;

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
            LocalDate date = productService.calculateShipDateByPurchaseDate(purchaseDate, Integer.parseInt(maxDaysToShip), Boolean.parseBoolean(shipOnWeekends));
            return ResponseEntity.ok(date.toString());
        } catch (Exception e1){
            String errorMsg = e1.getMessage() + "\n";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsg);
        }
    }

    @PostMapping(value="/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createProduct(@RequestBody String request) {
        productValidator.validateInput(request);
        ProductEntity product = productService.saveProduct(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(new JSONObject(product).toString(4));
    }

    @PostMapping(value="/createBatch")
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

}
