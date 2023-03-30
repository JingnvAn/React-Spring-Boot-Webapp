import { useState } from 'react';
import { API_URL } from '@/constant/constant';
import { Grid, Snackbar, Alert, TextField, Button, FormControl } from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from "react";

const HolidayInputForm = ({ onSubmit, onClose }) => {
    const [holidayDate, setHolidayDate] = useState(null);
    const [holidayName, setHolidayName] = useState(''); //TODO: add name for each holiday
    const [open, setOpen] = useState(false);
    const [requestStatus, setRequestStatus] = useState('error');
    const [alertText, setAlertText] = useState('unknown error');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const resetInputFields = () => {
        setHolidayDate(null);
        setHolidayName('');
    };

    const handleSubmit = async (newDate) => {
        resetInputFields();
        setOpen(false);
        setAlertText('');
        setRequestStatus('warning');

        if(holidayDate !== null){
            const date = new Date(holidayDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedNewDate = `${month}-${day}-${year}`;
            console.log(formattedNewDate)
            const response = await fetch(API_URL.createHoliday, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formattedNewDate,
            });

            if (response.status === 200) {
                setRequestStatus('success');
                setAlertText('Holiday created successfully!');
                setOpen(true);
                // Call the `onSubmit` callback to let the parent component know the form was submitted successfully
                onSubmit();
            } else {
                setRequestStatus('error');
                setAlertText('Create failed. Please check your input and try again.');
                setOpen(true);
            }
        } else {
            setAlertText('Create failed. Please check your input and try again.')
            setRequestStatus('error')
            setOpen(true)
        }
    };

    return (
        <Container>
            <FormControl
                component="form"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }}
            >
                <TextField
                    label="Holiday Name"
                    value={holidayName}
                    onChange={(event) => setHolidayName(event.target.value)}
                />
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disablePast={true}
                        value={holidayDate}
                        onChange={(newDate) => setHolidayDate(newDate)}
                    />
                </LocalizationProvider>
                <br />
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <Button variant="outlined" color="primary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <br />
            </FormControl>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={requestStatus} sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HolidayInputForm;
