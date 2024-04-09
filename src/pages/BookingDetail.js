// Imports of needed modules
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStation } from "../hooks/useStation";
import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const BookingDetail = () => {
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  // Get the id of the booking from the URL
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const stationId = searchParams.get("stationId") || 1;
  const station = useStation(stationId);
  const navigate = useNavigate();

  // Fetches the specific booking details for the customer
  useEffect(() => {
    const fetchData = async () => {
      // If the data is already fetched it will not fetch it again
      setLoading(true);
      try {
        const response = await axios.get(
          `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${id}`
        );
        setBookingDetails(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [stationId, id]);

  // If the booking details are not fetched yet, it will return null
  if (loading || !bookingDetails) {
    return null;
  }

  // Parse the start and end date to get the date and time
  const startDate = new Date(bookingDetails.startDate);
  const endDate = new Date(bookingDetails.endDate);

  // Get the start and end date of the booking
  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  // Get the start and end time of the booking
  const startTime = startDate.toLocaleTimeString();
  const endTime = endDate.toLocaleTimeString();

  // Parse the start and end date to calculate the duration of the booking
  const parsedStartDate = new Date(formattedStartDate);
  const parsedEndDate = new Date(formattedEndDate);

  // Calculate the total duration of the booking into days
  const durationMs = parsedEndDate - parsedStartDate;
  const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  return (
    <>
      <Box className="booking-box mx-auto border-2 rounded-xl  border-slate-500">
        <Typography id="keep-mounted-modal-title" variant="h5" component="h2">
          Customer Name: {bookingDetails.customerName} <br /> Customer Id:{" "}
          {bookingDetails.id}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Station: {station} <br />
          Station id: {stationId} <br />
          Start Date: {formattedStartDate}
          <br /> End Date: {formattedEndDate} <br />
          Pickup Time: {startTime} <br /> Return Time: {endTime} <br />
          Duration: {durationDays} days
        </Typography>
        <span className="flex justify-center">
          <Button
            onClick={() => navigate("/casestudyreact")}
            variant="contained"
          >
            Go back
          </Button>
        </span>
      </Box>
      ;
    </>
  );
};

export default BookingDetail;
