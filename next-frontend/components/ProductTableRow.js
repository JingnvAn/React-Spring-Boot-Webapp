import React from "react";
import { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {API_URL} from "@/constant/constant";

const ProductTableRow = ({product, columns}) => {
    const BASE_SELLER_HELPER_API_URL = "http://localhost:8080/products"

    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0,10));
    const [shippingDate, setShippingDate] = useState("TBD");

    const handleRowData = (product, column) => {
        let value = "test";
        console.log(column.id)
        if (column.id === "purchaseDate") {
            const date = new Date();
            value = date.toISOString().slice(0,10);
        } else if (column.id === "shippingDate") {
            value = shippingDate
        } else {
            value = column.id === 'shipOnWeekends' ? (product[column.id] ? "Yes" : "No") : product[column.id]
        }
        return value;
    }

    const getShippingDateFromSellerHelper = (product) => {
        if (product !== null){
            fetch(API_URL.getProductShippingDate, {
                method:'GET',
                data:{

                }
            }).then(response => response.text())
                .then(data => {
                    console.log("shipping date: ", data)
                    setShippingDate(data)
                })
                .catch(error => console.error(error))
        }
    }

    useEffect(() => {
        getShippingDateFromSellerHelper(product)
    }, [purchaseDate])

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