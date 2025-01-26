import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { UserDataContext } from "../../Context/UserContext";
import { SharedContextData } from "../../Context/Shared";

const VehicleCard = ({
  title,
  seats,
  eta,
  time,
  description,
  price,
  image,
}) => {
  const { setIsConfirmRidePanelOpen } = useContext(SharedContextData);
  const { setIsVehiclePanelOpen } = useContext(UserDataContext);

  return (
    <div
      className="vehicle-card-container"
      onClick={() => {
        setIsConfirmRidePanelOpen(true);
        setIsVehiclePanelOpen(false);
      }}
    >
      <div className="vehicle-info-section">
        <img src={image.url} alt={image.alt} className="vehicle-image" />
        <div className="vehicle-text-info">
          <div className="vehicle-title-seats">
            <h3 className="vehicle-card-title">{title}</h3>
            <div className="flex items-center">
              <FaUser />
              <span className="ml-1">{seats}</span>
            </div>
          </div>
          <p className="vehicle-eta-time">
            {eta} • {time}
          </p>
          <p className="vehicle-card-description">{description}</p>
        </div>
      </div>
      <div className="vehicle-price">
        <p className="vehicle-price-text">{price}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
