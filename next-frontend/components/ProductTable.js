import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductTableRow from "@/components/ProductTableRow";
import {useEffect, useState} from "react";
import {API_URL} from "@/constant/constant";
import {CircularProgress} from "@mui/material";
import Image from "next/image";

const ProductTable = ({ pullNewData }) => {
    const [products, setProducts] = useState([]);
    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // add loading state

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL.getAllProduct, {
                    method: "GET"
                });
                const products = await response.json();
                setProducts(products);

                // Extract column names from first product object
                let columnNames = Object.keys(products[0]);
                columnNames.push("purchaseDate");
                columnNames.push("shippingDate");
                // Map column names to column objects
                const columns = columnNames.map((columnName) => ({
                    id: columnName,
                    label: columnName.charAt(0).toUpperCase() + columnName.slice(1),
                    minWidth: 170,
                }));
                setColumns(columns);
            } catch (error) {
                console.log(error);
            } finally { // set loading state to false
                setIsLoading(false);
            }
        };
        fetchData();
        console.log("pull?"+pullNewData)
    }, [pullNewData]);

    // render loading state until the data is ready
    if (isLoading) {
        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <CircularProgress />
                </TableContainer>
            </Paper>
        );
    }

    // render cute dog image if no data to display
    if (products.length === 0){
        return (
            <>
                <Image
                    src="/images/bao.png"
                    alt="A cute dog smiling"
                    width={270}
                    height={500}
                />
                <p>Ooops! There is nothing to display yet.</p>
            </>
        )
    }

    const slicedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedProducts.sort((p,q) => q.productId - p.productId).map((product) => (
                            <ProductTableRow key={product.productId} product={product} columns={columns}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default ProductTable;
