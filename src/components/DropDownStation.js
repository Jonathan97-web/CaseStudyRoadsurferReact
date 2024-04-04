import React, { useLayoutEffect } from "react";

const DropDownStation = ({ loading, locations, fetchData, onLocationChange }) => {
  useLayoutEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectChange = (event) => {
    onLocationChange(event.target.value);
  };

  return (
    <div>
      <div>
        <select onChange={handleSelectChange}>
          {!loading && locations.map((location) => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(DropDownStation);