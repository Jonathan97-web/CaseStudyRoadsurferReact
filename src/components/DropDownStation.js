import React, { useLayoutEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DropDownStation = ({ loading, locations, fetchData, onLocationChange }) => {
  useLayoutEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectChange = (event) => {
    onLocationChange(event.target.value);
  };

  return (
    <div>
      <div className="m-2">
        <FormControl fullWidth>
        <InputLabel>Station</InputLabel>
        <Select onChange={handleSelectChange}>
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