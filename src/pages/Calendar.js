// Imports of needed modules
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../styles/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { getWeekDates, getBookingsForWeek } from "../utils/Utils";

function Calendar({ locations, selectedLocation }) {
  // Navigation hook to navigate to a specific page from React Router
  const navigate = useNavigate();
  // State variables to handle the alert and the current bookings
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const [currentBookings, setCurrentBookings] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(
    location.state?.currentWeek || 0
  );

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

  function getDatesBetween(start, end) {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

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
          {startOfWeek.toLocaleDateString()} - {endOfWeek.toLocaleDateString()}
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
        {getDatesBetween(startOfWeek, endOfWeek).map((date, i) => {
          const day = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ][date.getDay() - 1];
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
              <div>
                {date.toLocaleDateString()}
                <br />
                {day}
              </div>
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
                          `/bookingdetail/${booking.id}?stationId=${selectedLocation}`,
                          { state: { currentWeek: currentWeek } }
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
