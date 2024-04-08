import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch the specific station that is requested
export const useStation = (id) => {
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://605c94c36d85de00170da8b4.mockapi.io/stations/${id}`
        );
        setStation(response.data?.name);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // If the station is not fetched yet, it will return null
  if (loading || !station) {
    return null;
  }

  return station;
};
