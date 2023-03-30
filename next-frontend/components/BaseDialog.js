import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const BaseDialog = ({ title, onClose, open, children }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    );
};

BaseDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default BaseDialog;
