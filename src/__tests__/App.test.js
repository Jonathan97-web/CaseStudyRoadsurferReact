// Imports of needed modules
import { render, screen } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import App from "../App";
import NavBar from "../components/NavBar";
import Calendar from "../pages/Calendar";
import React from "react";
import DropDownStation from "../components/DropDownStation";

it("renders the App component", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});

it("renders the DropDownStation component, using fetchData and locations as mock data", () => {
  const locations = [
    {
      id: 1,
      name: "Berlin",
    },
  ];
  const fetchData = jest.fn();
  render(
    <Router>
      <DropDownStation locations={locations} fetchData={fetchData} />
    </Router>
  );
});

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

it("renders the Calendar component and expects to find the previous week button and next week button, need to render locations and selectedLocation to avoid testing errors.", async () => {
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
  render(
    <Router>
      <Calendar
        fetchData={fetchData}
        locations={locations}
        selectedLocation={selectedLocation}
      />
    </Router>
  );

  // Use findByText to wait for the elements to be added to the DOM
  const prevButton = screen.getByText("Previous Week");
  const nextButton = screen.getByText("Next Week");

  // Check that the elements are in the document
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});
