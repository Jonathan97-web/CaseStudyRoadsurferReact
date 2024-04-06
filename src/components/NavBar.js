import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DropDownStation from './DropDownStation';


export default function NavBar({ locations, selectedLocation, setSelectedLocation, onLocationChange, fetchData }) {





  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <AppBar className='' position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            Booking Calendar
          </Typography>
          <DropDownStation 
                    locations={locations}
                    fetchData={fetchData}
                    onLocationChange={onLocationChange}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}