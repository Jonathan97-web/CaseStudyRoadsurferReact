// Imports of needed modules
import React, { useState } from "react";
import { Button } from "@mui/material";
import "../styles/Calendar.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Calendar({ locations, selectedLocation }) {
  // Navigation hook to navigate to a specific page from React Router
  const navigate = useNavigate();
  // Start date of the first booking available in API
  const startDate = new Date("2020-04-02T23:20:49.904Z");
  // End date in the future (In case new values/bookings are added to the API)
  const endDate = new Date("2025-12-31T23:20:49.904Z");
  const [showAlert, setShowAlert] = useState(false);

  // Calculate the first Monday of the year that the startDate falls in
  const year = startDate.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);
  const firstMondayOfYear = new Date(firstDayOfYear);
  firstMondayOfYear.setDate(
    firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7)
  );

  // Calculate the week number based on the startDate
  const weekNumber =
    Math.floor((startDate - firstMondayOfYear) / (7 * 24 * 60 * 60 * 1000)) + 1;

  const [currentWeek, setCurrentWeek] = useState(weekNumber);
  const totalWeeks = Math.ceil(
    (endDate - startDate) / (7 * 24 * 60 * 60 * 1000)
  );

  // getWeekDates function to get the start and end date of the week
  const getWeekDates = (weekNumber) => {
    // Calculate the start of the year
    const year = startDate.getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);

    // Calculate the first Monday of the year
    const firstMondayOfYear = new Date(firstDayOfYear);
    firstMondayOfYear.setDate(
      firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7)
    );

    // Calculate the start of the week
    const startOfWeek = new Date(firstMondayOfYear);
    startOfWeek.setDate(startOfWeek.getDate() + (weekNumber - 1) * 7);

    // Calculate the end of the week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return [startOfWeek, endOfWeek];
  };
  // getBookingsForWeek function to get the bookings for the week
  const getBookingsForWeek = (weekNumber) => {
    const [startOfWeek, endOfWeek] = getWeekDates(weekNumber);
    return locations
      .filter((location) => location.id === selectedLocation)
      .flatMap((location) => location.bookings)
      .filter((booking) => {
        const bookingDate = new Date(booking.startDate);
        return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
      });
  };
  // Function to get the next week
  const nextWeek = () => {
    let week = currentWeek + 1;
    while (week < totalWeeks) {
      if (getBookingsForWeek(week).length > 0) {
        setCurrentWeek(week);
        setShowAlert(false);
        break;
      }
      week++;
    }
    if (week >= totalWeeks) {
      setShowAlert(true);
    }
  };
  // Function to get the previous week
  const previousWeek = () => {
    let week = currentWeek - 1;
    while (week >= 0) {
      if (getBookingsForWeek(week).length > 0) {
        setCurrentWeek(week);
        setShowAlert(false);
        break;
      }
      week--;
    }
    if (week < 0) {
      setShowAlert(true);
    }
  };

  // Get the start and end date of the week
  const [startOfWeek, endOfWeek] = getWeekDates(currentWeek);
  const bookingsForWeek = getBookingsForWeek(currentWeek);

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
          <Alert severity="info">
            No more bookings found during these dates.
          </Alert>
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
