import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import HolidayInputForm from '@/components/HolidayInputForm';
import BaseDialog from '@/components/BaseDialog';

const HolidayDialog = ({ onSubmit }) => {
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
                Add a new Holiday
            </Button>
            <BaseDialog
                title="Add a new holiday"
                open={open}
                onClose={handleClose}
            >
                <HolidayInputForm onSubmit={onSubmit} onClose={handleClose} />
            </BaseDialog>
        </div>
    );
};

HolidayDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default HolidayDialog;
