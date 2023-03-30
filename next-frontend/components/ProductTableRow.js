import React from "react";
import { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {API_URL} from "@/constant/constant";
import DatePickerComponent from "./DatePickerComponent";

const ProductTableRow = ({product, columns}) => {
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0,10));
    const [shippingDate, setShippingDate] = useState("TBD");
    
    const handleShippingDateChange = (newDate) => {
        setPurchaseDate(newDate)
    }
    
    const handleRowData = (product, column) => {
        let value = "test";
        if (column.id === "purchaseDate") {
            return <DatePickerComponent handleShippingDateChange={handleShippingDateChange}/>
        } else if (column.id === "shippingDate") {
            value = shippingDate
        } else {
            value = column.id === 'shipOnWeekends' ? (product[column.id] ? "Yes" : "No") : product[column.id]
        }
        return value;
    }

    const getShippingDateFromSellerHelper = (product) => {
        if (product !== null){
            fetch(`${API_URL.getProductShippingDate}?` + new URLSearchParams({
            purchaseDate: purchaseDate,
            maxDaysToShip: product.maxBusinessDaysToShip,
            shipOnWeekends: product.shipOnWeekends
        })).then(response => response.text())
                .then(data => {
                    setShippingDate(data)
                })
                .catch(error => console.error(error))
        }
    }

    useEffect(() => {
        
        getShippingDateFromSellerHelper(product)
        console.log("calculate new shipping date!")
    }, [product, purchaseDate])

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={product.productId}>
                {columns && columns.map((column) => (
                    <TableCell key={column.id}>
                        {handleRowData(product, column)}
                    </TableCell>
                ))}   
            </TableRow>
        </>
    );
};


export default ProductTableRow;