import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DropDownStation from "./DropDownStation";

export default function NavBar({
  locations,
  selectedLocation,
  setSelectedLocation,
  onLocationChange,
  fetchData,
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
