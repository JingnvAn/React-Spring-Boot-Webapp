package com.sellerhelper.validator;

import com.sellerhelper.constant.ErrorMessage;
import com.sellerhelper.constant.ValidationException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductValidator {
    public enum Properties {
        PRODUCT_ID("productId"),
        PRODUCT_NAME("productName"),
        INVENTORY_QUANTITY("inventoryQuantity"),
        SHIP_ON_WEEKENDS("shipOnWeekends"),
        MAX_BUSINESS_DAY_TO_SHIP("maxBusinessDaysToShip");

        private final String value;
        Properties(String value) { this.value = value; }
        public String getValue() { return value;}

    }

    public void validateInput(String input){
        if (input == null || input.isEmpty()){
            throw new ValidationException(ErrorMessage.EMPTY_INPUT_GENERAL.getMessage());
        }
        JSONObject productJson = new JSONObject(input);
        validatePropertiesExist(productJson);

    }
    private void validatePropertiesExist(JSONObject product) {
        if(product == null)
            throw new ValidationException(ErrorMessage.EMPTY_INPUT_GENERAL.getMessage());

        // validate every property exists in the input
        for(Properties p : Properties.values()){
            if (!p.getValue().equals("productId") && !product.has(p.getValue())){
                throw new ValidationException(String.format(
                        ErrorMessage.INVALID_INPUT_MISSING_REQUIRED_PROPERTY.getMessage(),
                        p.getValue()));
            }
        }
    }

    public void validateUserDefinedHolidays(String input) {
        if(input == null || input.isEmpty())
            throw new ValidationException(ErrorMessage.EMPTY_INPUT_GENERAL.getMessage());

        List<String> dates = List.of(input.split(","));
        for(String d : dates){
            if(!d.contains("-") || d.split("-").length < 3)
                throw new ValidationException(String.format(ErrorMessage.INVALID_DATE_FORMAT.getMessage(), d));
            String[] split = d.split("-");

        }
    }
}
