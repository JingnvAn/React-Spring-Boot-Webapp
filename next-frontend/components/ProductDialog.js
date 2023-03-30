import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ProductInputForm from '@/components/ProductInputForm';
import BaseDialog from '@/components/BaseDialog';

const ProductDialog = ({ onSubmit }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <br />
            <Button variant="contained" onClick={handleClickOpen}>
                Add New Product
            </Button>
            <BaseDialog
                title="Add a new product"
                open={open}
                onClose={handleClose}
            >
                <ProductInputForm onSubmit={onSubmit} onClose={handleClose} />
            </BaseDialog>
        </div>
    );
};

ProductDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ProductDialog;
