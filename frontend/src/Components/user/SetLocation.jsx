import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { FaMapMarkerAlt } from "react-icons/fa";

const SetLocation = ({ location, setLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (input) => {
    if (!input) return; // Prevent empty input calls
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
    fetchSuggestions(location); // Fetch suggestions whenever the location input changes
  }, [location]);

  return (
    <div className="relative">
      {loading && <Loading />}
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="location-card-container"
              onClick={() => {
                setLocation(suggestion.description); // Update location on selection
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
                  {suggestion.description.split(",")[0]}{" "}
                  {/* Split for better display */}
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

export default SetLocation;
