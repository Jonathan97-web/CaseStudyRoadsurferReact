// Imports of needed modules
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../styles/Calendar.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { getWeekDates, getBookingsForWeek } from "../utils/Utils";

function Calendar({ locations, selectedLocation }) {
  // Navigation hook to navigate to a specific page from React Router
  const navigate = useNavigate();
  // State variables to handle the alert and the current bookings
  const [showAlert, setShowAlert] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);

  // Get the bookings for the selected location and sort them by date in ascending order
  useEffect(() => {
    const currentLocation = locations.find(
      (location) => location.id === selectedLocation
    );
    if (currentLocation?.bookings.length > 0) {
      setCurrentBookings(
        currentLocation?.bookings.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
      );
    }
  }, [selectedLocation, locations]);

  // Get the bookings for the current week
  const bookingsForWeek = getBookingsForWeek(currentWeek, currentBookings);

  // Show alert if no bookings are found when pressing next or previous week
  useEffect(() => {
    if (bookingsForWeek.length === 0 && currentWeek > 0) {
      setShowAlert(true);
    }
  }, [currentWeek, bookingsForWeek.length]);

  // Function to get the next week
  const nextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };
  // Function to get the previous week
  const previousWeek = () => {
    let week = currentWeek - 1;
    if (currentWeek === 0) {
      setShowAlert(true);
    } else {
      setCurrentWeek(week);
      setShowAlert(false);
    }
  };

  // Get the start and end date of the week
  const [startOfWeek, endOfWeek] = getWeekDates(
    currentWeek,
    currentBookings[0]?.startDate
  );

  return (
    <>
      {/* Shows Alert if no bookings are found when pressing next or previous week */}
      {showAlert && (
        <Snackbar
          open={showAlert}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          autoHideDuration={2000}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity="info">No bookings found during these dates.</Alert>
        </Snackbar>
      )}
      <div>
        <p className="text-white text-xl m-2">
          {startOfWeek.toDateString()} - {endOfWeek.toDateString()}
        </p>
        <div className="flex m-3 justify-center gap-2">
          <Button variant="contained" onClick={previousWeek}>
            Previous Week
          </Button>
          <Button variant="contained" onClick={nextWeek}>
            Next Week
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-7 md:grid-cols-4 gap-1">
        {/* Mapping over the specific days in the calendar */}
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day, i) => {
          // Filter the bookings for the specific day
          const bookingsForDay = bookingsForWeek.filter((booking) => {
            const bookingDate = new Date(booking.startDate);
            const dayIndex = bookingDate.getDay();
            const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            return adjustedDayIndex === i;
          });

          return (
            <div
              className="text-white border-2 rounded-xl border-slate-700"
              key={i}
            >
              {/* Display the day of the week */}
              <div>{day}</div>
              {/* Display the bookings for the day */}
              {bookingsForDay.length > 0 ? (
                bookingsForDay.map((booking, j) => (
                  <ul
                    className="text-white backdrop-brightness-90 bg-transparent border-2 border-slate-700 rounded-xl m-1 p-5"
                    key={j}
                  >
                    <li>Booking ID: {booking.id}</li>
                    <li>{booking.customerName}</li>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(
                          `/bookingdetail/${booking.id}?stationId=${selectedLocation}`
                        )
                      }
                    >
                      View Details
                    </Button>
                  </ul>
                ))
              ) : (
                // Renders if no bookings are found for the specific day
                <div>No bookings found.</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;
