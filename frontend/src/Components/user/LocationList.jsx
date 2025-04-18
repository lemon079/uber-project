import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../shared/Loading";
import { UserDataContext } from "../../Context/UserContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationList = ({
  pickUpLocation,
  destination,
  setPickUpLocation,
  setDestination,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setIsVehiclePanelOpen } = useContext(UserDataContext);

  const fetchSuggestions = async (input) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/suggestions`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (suggestions.length === 0) {
      if (pickUpLocation?.length > 2) {
        fetchSuggestions(pickUpLocation);
      } else if (destination?.length > 2) {
        fetchSuggestions(destination);
      } else {
        setSuggestions([]); // Clear suggestions when input is too short
      }
    }
  }, [pickUpLocation, destination]);

  return (
    <div className="relative">
      {loading && <Loading />}
      {suggestions?.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="location-card-container"
              onClick={() => {
                setPickUpLocation(suggestion.description);
                setSuggestions([]);
              }}
            >
              {/* Location Icon */}
              <div className="location-icon-container">
                <FaMapMarkerAlt className="location-icon" />
              </div>

              {/* Location Text Content */}
              <div className="location-text-content">
                <h3 className="location-card-title">
                  {suggestion.description.split(" ")[0]}
                </h3>
                <p className="location-card-address">
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationList;
