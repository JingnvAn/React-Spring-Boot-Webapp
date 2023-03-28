import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ShippingDatePicker = ({ handleShippingDateChange }) => {
  const [selectedDate, setSelectedDate] = React.useState();
  const [defaultDate, setDefaultDate] = React.useState(dayjs("2023-03-28"));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)

    const date = new Date(newDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedNewDate = `${year}-${month}-${day}`;
    handleShippingDateChange(formattedNewDate)

    console.log("shipping date changed! "+ formattedNewDate)
  }

  const constructDateString = (date) => {
    const dd = date.getDate().toString()
    const mm = (date.getMonth() + 1).toString()
    const yyyy = date.getFullYear().toString()
    return yyyy+"-"+mm+"-"+dd
  }


  React.useEffect(()=>{
    const date = new Date()
    setDefaultDate(constructDateString(date))
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        disablePast={true}
        defaultValue={dayjs(defaultDate)}
        value={selectedDate ? dayjs(selectedDate) : dayjs(defaultDate)}
        onChange={(newDate) => handleDateChange(newDate)}
      />
    </LocalizationProvider>
  )
}

export default ShippingDatePicker