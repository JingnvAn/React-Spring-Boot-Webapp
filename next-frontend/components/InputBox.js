import { useState } from 'react';
import { API_URL } from '@/constant/constant';
import { Grid, Snackbar, Alert, TextField, Checkbox, Button, FormControlLabel, FormGroup, FormLabel, FormControl } from '@mui/material';
import { Container } from '@mui/system';


const InputBox = ({ onSubmit, onClose}) => {
  const [maxBusinessDaysToShip, setMaxBusinessDaysToShip] = useState('');
  const [shipOnWeekends, setShipOnWeekends] = useState(false);
  const [inventoryQuantity, setInventoryQuantity] = useState('');
  const [productName, setProductName] = useState('');
  const [open, setOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState('error');
  const [alertText, setAlertText] = useState('unknow error');

  const [pullData, setPullData] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const resetInputFields = () => {
    setShipOnWeekends(false)
    setMaxBusinessDaysToShip('')
    setInventoryQuantity('')
    setProductName('')
  }

  const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = async () => {
    resetInputFields()
    setOpen(false)
    setAlertText('')
    setRequestStatus('warning')

    const response = await fetch(API_URL.createProduct, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            maxBusinessDaysToShip,
            shipOnWeekends,
            inventoryQuantity,
            productName,
        })
    });

    if(response.status === 201){
        setRequestStatus('success')
        setAlertText('Product created successfully!')
        setOpen(true)
        setPullData(generateRandomString(8))
        // Call the `onSubmit` callback to let the parent component know the form was submitted successfully
        onSubmit();
    }else {
        setRequestStatus('error')
        setAlertText('Create failed. Please check your input and try again.')
        setOpen(true)
    }
  };

  return (
        <Container>
            <FormControl component="form" onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
            }}>
                <FormLabel component="legend">Create a Product</FormLabel>
                <FormGroup>
                    <TextField
                        label="Max Business Days To Ship"
                        value={maxBusinessDaysToShip}
                        onChange={(event) => setMaxBusinessDaysToShip(event.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Inventory Quantity"
                        value={inventoryQuantity}
                        onChange={(event) => setInventoryQuantity(event.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Product Name"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                    <br />
                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={shipOnWeekends} 
                                onChange={(event) => setShipOnWeekends(event.target.checked)} 
                            />
                        }
                        label="Ship on Weekends?"
                    />
                    <br />
                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </Grid>
                    </Grid> 
                    <br />                
                </FormGroup>
            </FormControl>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
            <Alert onClose={handleClose} severity={requestStatus} sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
     </Container>
  );
};

export default InputBox;
