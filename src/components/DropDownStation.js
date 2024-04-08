import React, { useEffect } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import "../App.css";

// Dropdown menu for selections of citites for calendar
const DropDownStation = ({
  loading,
  selectedLocation,
  locations,
  fetchData,
  onLocationChange,
}) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handles the change of the dropdown menu when you select something different
  const handleSelectChange = (e) => {
    onLocationChange(e.target.value);
  };

  /* If the selected location is not null it will convert it to a string otherwise it will be an empty string,
    this is to avoid any errors and value on Select needs to be a string */
  const selectedLocationValue = selectedLocation
    ? selectedLocation.toString()
    : "";

  // Dropdown menu for selections of stations for calendar
  return (
    <div className="m-2">
      <FormControl sx={{ minWidth: "90%" }}>
        <InputLabel sx={{ color: "white" }}>Location</InputLabel>
        <Select
          value={selectedLocationValue}
          labelId="label"
          onChange={handleSelectChange}
          id="dropdown"
          className="border-2 border-slate-500 hover:border-blue-400"
        >
          {!loading &&
            locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default React.memo(DropDownStation);
