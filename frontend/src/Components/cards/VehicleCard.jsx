import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { UserDataContext } from "../../Context/UserContext";

const VehicleCard = ({
  title,
  seats,
  eta,
  time,
  description,
  price,
  image,
}) => {
  const { setIsConfirmRidePanelOpen, setIsVehiclePanelOpen } =
    useContext(UserDataContext);

  return (
    <div
      className="flex items-start justify-between p-4 border rounded-lg shadow-md bg-white"
      onClick={() => {
        setIsConfirmRidePanelOpen(true);
        setIsVehiclePanelOpen(false);
      }}
    >
      <div className="flex items-center gap-3">
        <img src={image.url} alt={image.alt} className="w-16 h-16 object-cover" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold">{title}</h3>
            <div className="flex items-center">
              <FaUser />
              <span className="ml-1">{seats}</span>
            </div>
          </div>
          <p className="text-sm">
            {eta} • {time}
          </p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">₹{price}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
