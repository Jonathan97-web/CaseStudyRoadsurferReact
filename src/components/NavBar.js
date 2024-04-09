import * as React from "react";
import AppBar from "@mui/material/AppBar";
import DropDownStation from "./DropDownStation";

export default function NavBar({
  locations,
  selectedLocation,
  setSelectedLocation,
  onLocationChange,
  fetchData,
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  // useEffect to handle the scroll event for the navbar
  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 0;
      if (isScrolled !== show) {
        setIsScrolled(show);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  // Returns the navbar with the dropdown for selecting the stations
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "transparent",
        boxShadow: "none",
        border: isScrolled ? 0 : 2,
        borderColor: "slategray",
        borderRadius: 5,
        width: "80vw",
        margin: "auto",
        marginBottom: 2,
        transition: "border 0.05s ease-in-out",
      }}
    >
      {/* Dropdown for selecting the stations */}
      <DropDownStation
        locations={locations}
        fetchData={fetchData}
        onLocationChange={onLocationChange}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </AppBar>
  );
}
