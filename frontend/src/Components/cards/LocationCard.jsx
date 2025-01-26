import React, { useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { UserDataContext } from "../../Context/UserContext";

const LocationCard = ({ title, address, setSuggestions }) => {
  const { setIsVehiclePanelOpen } = useContext(UserDataContext);

  return (
    <div
      className="location-card-container"
      onClick={() => {
        // setIsVehiclePanelOpen(true);
        setSuggestions([]);
      }}
    >
      {/* Location Icon */}
      <div className="location-icon-container">
        <FaMapMarkerAlt className="location-icon" />
      </div>

      {/* Location Text Content */}
      <div className="location-text-content">
        <h3 className="location-card-title">{title.split(" ")[0]}</h3>
        <p className="location-card-address">{address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
