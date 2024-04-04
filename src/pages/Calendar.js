import React, { useState } from "react";
import axios from "axios";
import DropDownStation from "../components/DropDownStation";
import { Button } from "@mui/material";

function Calendar() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchData = async () => {
    if (!fetched) {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://605c94c36d85de00170da8b4.mockapi.io/stations"
        );
        console.log(response.data);
        setLocations(response.data);
        setFetched(true);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  return (
    <>
      <DropDownStation
        loading={loading}
        locations={locations}
        fetchData={fetchData}
        onLocationChange={handleLocationChange}
      />
      <div id="grid-container" className="grid grid-cols-7 gap 3">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <div key={i}>
            <div>{day}</div>
            {locations
              .filter(location => selectedLocation === null || location.id === selectedLocation)
              .flatMap(location => location.bookings)
              .filter(booking => {
                const bookingDate = new Date(booking.startDate);
                const dayIndex = bookingDate.getDay();
                const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
                return adjustedDayIndex === i;
              })
              .map((booking, j) => (
                <ul className="border-solid border-black" key={j}>
                  <li>{booking.customerName},<br /> {booking.startDate}</li>
                  <Button>View Booking</Button>
                </ul>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Calendar;