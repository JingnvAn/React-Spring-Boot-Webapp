import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import HolidayInputBox from "@/components/HolidayInputBox";

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};

function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle>Add a new holiday</DialogTitle>
            <HolidayInputBox onSubmit={props.onSubmit} onClose={props.onClose}/>
        </Dialog>
    );
}

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
            <SimpleDialog
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default HolidayDialog