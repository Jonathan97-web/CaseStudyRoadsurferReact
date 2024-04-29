import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { colors } from "@mui/material";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function CalendarView({
  startOfWeek,
  setCurrentWeek,
  currentBookings,
}) {
  const startDate = dayjs(startOfWeek);
  const [firstBookingStartDate, setFirstBookingStartDate] = useState(
    dayjs(currentBookings[0]?.startDate).startOf("day")
  );

  useEffect(() => {
    setFirstBookingStartDate(
      dayjs(currentBookings[0]?.startDate).startOf("day")
    );
  }, [currentBookings]);

  // Handle date change when selecting a new date in the calendar
  const handleDateChange = (e) => {
    let firstBookingStartDate = dayjs(currentBookings[0]?.startDate).startOf(
      "day"
    );
    firstBookingStartDate = firstBookingStartDate.startOf("week");
    let weekNumber = e.startOf("week").diff(firstBookingStartDate, "week");

    setCurrentWeek(weekNumber);
  };
  const shouldDisableDate = (date) => {
    return date.isBefore(firstBookingStartDate);
  };

  const isBookingDay = (day, bookings) => {
    return bookings.some((booking) =>
      dayjs(booking.startDate)
        .startOf("day")
        .isSame(dayjs(day).startOf("day"), "day")
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
        }}
        defaultValue={startDate}
        value={firstBookingStartDate}
        onChange={(e) => handleDateChange(e)}
        minDate={firstBookingStartDate}
        shouldDisableDate={shouldDisableDate}
        displayWeekNumber={true}
        slotProps={{
          day: ({ day }) => ({
            style: isBookingDay(day, currentBookings)
              ? {
                  backgroundColor: colors.blue[500],
                  color: "black",
                }
              : {},
          }),
        }}
      />
    </LocalizationProvider>
  );
}
