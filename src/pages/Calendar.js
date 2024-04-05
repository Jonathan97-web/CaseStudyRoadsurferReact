import React, { useState } from "react";
import axios from "axios";
import DropDownStation from "../components/DropDownStation";
import ShowCustomerModal from "../components/ShowCustomerModal";
import { Button } from "@mui/material";
import "../styles/Calendar.css"

function Calendar() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const fetchData = async () => {
    if (!fetched) {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://605c94c36d85de00170da8b4.mockapi.io/stations"
        );
        // console.log(response.data);
        setLocations(response.data);
        const berlinLocation = response.data.find(location => location.name === 'Berlin')
        if (berlinLocation) {
          setSelectedLocation(berlinLocation.id)
        }
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

  const handleShowModal = (customer) => {
    setShowModal(!showModal)
    setSelectedCustomer(customer)
  }

  return (
    <>
    {/*
     Showing the specific modal for the customer when you press View Booking button. */}
      {showModal && <ShowCustomerModal 
      showModal = {showModal}
      handleShowModal = {handleShowModal}
      customer={selectedCustomer}
      selectedLocation={selectedLocation}
      locations={locations}
      />}
       { /* Dropdown menu for specifying which of the cities you want to see the bookings for. */}
      <DropDownStation
        loading={loading}
        locations={locations}
        fetchData={fetchData}
        onLocationChange={handleLocationChange}
      />
      <div id="grid-container border-test" className=" grid  lg:grid-cols-7 gap-3">
        { /* Mapping over the specific days in the calendar */}
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <div id="border-test" key={i}>
            <div>{day}</div>
            {locations
              .filter(location => selectedLocation !== null && location.id === selectedLocation)
              .flatMap(location => location.bookings)
              .filter(booking => {
                const bookingDate = new Date(booking.startDate);
                const dayIndex = bookingDate.getDay();
                const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
                return adjustedDayIndex === i;
              })
              .map((booking, j) => (
                <ul id="border-test" className="m-3" key={j}>
                  <li>{booking.customerName}<br /> {booking.startDate} - {booking.endDate} <br /> </li>
                  <Button onClick={() => handleShowModal(booking)}>View Booking</Button>
                </ul>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Calendar;