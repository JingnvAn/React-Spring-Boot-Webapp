package com.sellerhelper.service;

import com.sellerhelper.constant.ErrorMessage;
import com.sellerhelper.constant.ResourceNotFoundException;
import com.sellerhelper.entity.ProductEntity;
import com.sellerhelper.repository.ProductRepository;
import com.sellerhelper.validator.ProductValidator;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    public List<ProductEntity> getAllProducts() {
        logger.debug("About to getAllProducts ...");
        List<ProductEntity> products = new ArrayList<>();
        for (ProductEntity p : productRepository.findAll()){
            products.add(p);
        }
        return products;
    }

    public ProductEntity getProductById(String id){
        logger.debug("Entered getProductById for id: " + id);
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    public ProductEntity saveProduct(String input){
        ProductEntity product = new ProductEntity();
        JSONObject productJson = new JSONObject(input);
        product.setProductName(productJson.getString(ProductValidator.Properties.PRODUCT_NAME.getValue()));
        product.setInventoryQuantity(productJson.getInt(ProductValidator.Properties.INVENTORY_QUANTITY.getValue()));
        product.setMaxBusinessDaysToShip(productJson.getInt(ProductValidator.Properties.MAX_BUSINESS_DAY_TO_SHIP.getValue()));
        product.setShipOnWeekends(productJson.getBoolean(ProductValidator.Properties.SHIP_ON_WEEKENDS.getValue()));
        logger.debug("About to save product: " + new JSONObject(product).toString(4));
        return productRepository.save(product);
    }

    public LocalDate calculateShipDateById(String productId) {
        ProductEntity product = getProductById(productId);
        if(product == null){
            throw new ResourceNotFoundException(String.format(ErrorMessage.RESOURCE_NOT_FOUND.getMessage(), productId));
        }

        int days = product.getMaxBusinessDaysToShip();
        LocalDate currentDate = LocalDate.now();
        LocalDate shipDate;
        if(product.getShipOnWeekends()){
            shipDate = currentDate.plusDays(days-1);
        }else{
            int daysToAdd = days;
            shipDate = currentDate;
            while(daysToAdd > 1){
                shipDate = shipDate.plusDays(1);
                if(shipDate.getDayOfWeek() == DayOfWeek.SATURDAY || shipDate.getDayOfWeek() == DayOfWeek.SUNDAY){
                    daysToAdd++;
                }
                daysToAdd--;
            }
        }
        logger.debug("Shipping date for id "+ productId +" is " + dateTranslator(shipDate));
        return shipDate;
    }

    private String dateTranslator(LocalDate localDate) {
        return localDate.getMonthValue()+"-"+localDate.getDayOfMonth()+"-"+localDate.getYear();
    }

    public LocalDate calculateShipDateByPurchaseDate(String dateString,
                                                     int maxDaysToShip,
                                                     boolean shipOnWeekends,
                                                     HolidayHelper holidayHelper) {
        LocalDate purchaseDate = LocalDate.parse(dateString);
        LocalDate shipDate;

        if(shipOnWeekends){
            shipDate = purchaseDate.plusDays(maxDaysToShip-1);
        }else{
            int daysToAdd = maxDaysToShip;
            shipDate = purchaseDate;
            while(daysToAdd > 1){
                shipDate = shipDate.plusDays(1);
                if(shipDate.getDayOfWeek() == DayOfWeek.SATURDAY ||
                        shipDate.getDayOfWeek() == DayOfWeek.SUNDAY ||
                        isHoliday(shipDate, holidayHelper)){
                    daysToAdd++;
                }
                daysToAdd--;
            }
        }
        logger.debug("Shipping date is " + dateTranslator(shipDate));
        return shipDate;
    }

    private boolean isHoliday(LocalDate date, HolidayHelper holidayHelper) {
        return holidayHelper.isHoliday(date);
    }
}
