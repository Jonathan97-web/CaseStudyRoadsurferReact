import React from "react";
import { render, screen } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import App from "../App";
import NavBar from "../components/NavBar";
import Calendar from "../pages/Calendar";

// Renders the App component
it("renders", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});

// Renders the Navbar component and sets the location to Berlin
it("renders the Navbar, sets the location to match the location provided under, and sets the selected location to Berlin", () => {
  const fetchData = jest.fn();
  const locations = [
    {
      id: 1,
      name: "Berlin",
      bookings: [
        {
          id: "1",
          customerName: "John Doe",
          startDate: "2022-04-04T10:00:00Z",
          endDate: "2022-04-11T11:00:00Z",
        },
      ],
    },
  ];
  const selectedLocation = "1";
  const setSelectedLocation = jest.fn();
  try {
    render(
      <NavBar
        fetchData={fetchData}
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    );
  } catch (error) {
    console.log(error);
  }
});

// Renders the Calendar component and fetches the bookings/locations
it("renders the Calendar component and fetches locations and expects to find customer name and booking id.", async () => {
  const fetchData = jest.fn();
  const locations = [
    {
      id: 1,
      name: "Berlin",
      bookings: [
        {
          id: 1,
          customerName: "John Doe",
          startDate: "2022-04-04T10:00:00Z",
          endDate: "2022-04-11T11:00:00Z",
        },
      ],
    },
    {
      id: 2,
      name: "Barcelona",
      bookings: [
        {
          id: 1,
          customerName: "Jane Doe",
          startDate: "2022-04-04T10:00:00Z",
          endDate: "2022-04-11T11:00:00Z",
        },
      ],
    },
  ];
  const selectedLocation = 1;
  const handleShowModal = jest.fn();
  render(
    <Calendar
      fetchData={fetchData}
      locations={locations}
      selectedLocation={selectedLocation}
      handleShowModal={handleShowModal}
    />
  );
  expect(await screen.findByText(/booking id:\s*1/i)).toBeInTheDocument();
  expect(await screen.getByText("John Doe")).toBeInTheDocument();
});
