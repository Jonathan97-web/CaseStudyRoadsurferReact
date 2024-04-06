import React, { useEffect, useState } from "react";
import ShowCustomerModal from "../components/CustomerModal";
import { Button } from "@mui/material";
import "../styles/Calendar.css";

function Calendar({ locations, selectedLocation, fetchData }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to handle the change of the location in the dropdown menu when you select a different city
  const handleShowModal = (customer) => {
    setShowModal(!showModal);
    setSelectedCustomer(customer);
  };

  return (
    <>
      {/* Showing the specific modal for the customer when you press View Booking button. */}
      {showModal && (
        <ShowCustomerModal
          showModal={showModal}
          handleShowModal={handleShowModal}
          selectedLocation={selectedLocation}
          customer={selectedCustomer}
          locations={locations}
        />
      )}
      <div
        id="border-test"
        className=" grid grid-cols-2  xl:grid-cols-7 md:grid-cols-4 gap-1"
      >
        {/* Mapping over the specific days in the calendar */}
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day, i) => (
          <div id="border-test" key={i}>
            <div>{day}</div>
            {locations &&
              (() => {
                const bookingsForDay = locations
                  .filter(
                    (location) =>
                      selectedLocation !== null &&
                      location.id === selectedLocation
                  )
                  .flatMap((location) => location.bookings)
                  .filter((booking) => {
                    // Checks if the booking is for the specific day
                    const bookingDate = new Date(booking.startDate);
                    // Creates index for the booking date from the day number
                    const dayIndex = bookingDate.getDay();
                    // Adjusts the day index to start from Monday instead of Sunday
                    const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
                    return adjustedDayIndex === i;
                  });

                // Maps over the bookings for the specific day and if it's empty it returns No bookings found.
                return bookingsForDay.length > 0 ? (
                  bookingsForDay.map((booking, j) => (
                    <ul id="border-test" className="m-1 p-5" key={j}>
                      <li className="font-sane">Booking ID: {booking.id}</li>
                      <li className="font-sans">{booking.customerName} </li>
                      {/* Opens specific modal with information of the customer */}
                      <Button
                        variant="contained"
                        onClick={() => handleShowModal(booking)}
                      >
                        View Booking
                      </Button>
                    </ul>
                  ))
                ) : (
                  <div>No bookings found</div>
                );
              })()}
          </div>
        ))}
      </div>
      <div className="flex m-2 gap-2 justify-center">
        {/* Buttons to navigate between weeks */}
        <Button variant="contained">Prev Week</Button>
        <Button variant="contained">Next Week</Button>
      </div>
    </>
  );
}

export default Calendar;
