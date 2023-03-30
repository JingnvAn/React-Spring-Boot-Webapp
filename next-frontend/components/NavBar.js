import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      {...props}
    />
  );
}

export default function NavTabs({page}) {
  const [value, setValue] = React.useState(page || 0);

  const handleChange = (event, newValue) => {
      console.log(newValue)
      setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor:'#e2e2e2'}}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
            <LinkTab label="Home" href="/" />
            <LinkTab label="Product" href="/product" />
            <LinkTab label="Holiday" href="/holiday" />
        </Tabs>
    </Box>
  );
}