// Utils file for exporting functions to get the week dates and bookings for the week

// Function for getting the week dates
export const getWeekDates = (weekNumber, startDate) => {
  startDate =
    startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : new Date();

  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? 6 : day - 1; // Consider Monday as the start of the week (day 1)
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  // Add the appropriate number of weeks
  startOfWeek.setDate(startOfWeek.getDate() + 7 * weekNumber);

  // Calculate the end of the week as 6 days after the start of the week
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return [startOfWeek, endOfWeek];
};

// Function for getting bookings for the week
export const getBookingsForWeek = (weekNumber, currentBookings) => {
  const [startOfWeek, endOfWeek] = getWeekDates(
    weekNumber,
    currentBookings[0]?.startDate
  );
  return currentBookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate).getTime();
    return (
      bookingDate >= new Date(startOfWeek).getTime() &&
      bookingDate <= new Date(endOfWeek).getTime()
    );
  });
};
