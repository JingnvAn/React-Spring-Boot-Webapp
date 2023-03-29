import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {API_URL} from "@/constant/constant";
import EventIcon from '@mui/icons-material/Event';
import PropTypes from "prop-types";

MfrList.propTypes = {
    mfrCount: PropTypes.number.isRequired,
    mfrHolidays: PropTypes.array.isRequired,

};
function MfrList(props) {
    if(props.mfrCount === 0){
        return (
            <Typography>
                You have not added any holidays for your account.
            </Typography>)
    }else{
        return (
            <List>
                {props.mfrHolidays.map((dateString) => (
                    <ListItem key={dateString}>
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={dateString}/>
                    </ListItem>))}
            </List>)
    }
}
const HolidayComponent = () => {
    const [isLoading, setIsLoading] = useState(true); // add loading state
    const [defaultHolidays, setDefaultHolidays] = useState([])
    const [mfrHolidays, setMfrHolidays] = useState([]) // manufacture defined holidays

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL.getAllHolidays, {
                    method: "GET"
                });

                if (response.status === 200) {
                    const data = await response.json();
                    if (data) {
                        const { us, mfr } = data;
                        setDefaultHolidays(us);
                        setMfrHolidays(mfr);
                    } else {
                        console.log('No data received from server');
                    }
                } else {
                    console.log('Failed to fetch holidays');
                }
            } catch (e) {
                setIsLoading(false);
                console.log('Failed to fetch holidays');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [setDefaultHolidays, setMfrHolidays]);

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                       Default holidays (US)
                    </Typography>
                    <List >
                        {defaultHolidays.map((dateString) => (<ListItem key={dateString}>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={dateString}
                            />
                        </ListItem>))}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Manufacture holidays (you define them)
                    </Typography>
                    <MfrList mfrCount={mfrHolidays.length} mfrHolidays={mfrHolidays}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HolidayComponent