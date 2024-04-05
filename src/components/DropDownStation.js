import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DropDownStation = ({ loading, selectedLocation, locations, fetchData, onLocationChange }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSelectChange = (event) => {
    onLocationChange(event.target.value);
  };

    const location = selectedLocation ? selectedLocation.toString() : '';


  return (
    <div>
      <div className="m-2">
        <FormControl fullWidth>
        <InputLabel>Station</InputLabel>
        <Select value={location} onChange={handleSelectChange}>
          {!loading && locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
          )) } 
        </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default React.memo(DropDownStation);