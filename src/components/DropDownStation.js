import React, { useEffect } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

// Dropdown menu for selections of citites for bookings
const DropDownStation = ({
  loading,
  setSelectedLocation,
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

  return (
    <div>
      <div className="m-2 text-white">
        <FormControl fullWidth>
          <Select value={selectedLocationValue} onChange={handleSelectChange}>
            {!loading &&
              locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default React.memo(DropDownStation);
