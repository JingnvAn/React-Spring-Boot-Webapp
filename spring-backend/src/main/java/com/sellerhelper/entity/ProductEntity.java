package com.sellerhelper.entity;

import jakarta.persistence.*;

@Entity
@Table(name="product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    private String productName;
    private Integer inventoryQuantity;
    private Boolean shipOnWeekends;
    private Integer maxBusinessDaysToShip;

    public ProductEntity(){}

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getInventoryQuantity() {
        return inventoryQuantity;
    }

    public void setInventoryQuantity(Integer inventoryQuantity) {
        this.inventoryQuantity = inventoryQuantity;
    }

    public Boolean getShipOnWeekends() {
        return shipOnWeekends;
    }

    public void setShipOnWeekends(Boolean shipOnWeekends) {
        this.shipOnWeekends = shipOnWeekends;
    }

    public Integer getMaxBusinessDaysToShip() {
        return maxBusinessDaysToShip;
    }

    public void setMaxBusinessDaysToShip(Integer maxBusinessDaysToShip) {
        this.maxBusinessDaysToShip = maxBusinessDaysToShip;
    }
}

