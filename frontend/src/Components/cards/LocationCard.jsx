import React, { useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { UserDataContext } from "../../Context/UserContext";

const LocationCard = ({ title, address }) => {
  const { setIsVehiclePanelOpen } = useContext(UserDataContext);

  return (
    <div
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
      onClick={() => {
        setIsVehiclePanelOpen(true)
      }}
    >
      <div>
        <FaMapMarkerAlt className="flex items-center justify-center w-10 h-10 p-2  bg-gray-100 rounded-full" />
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-extrabold">{title}</h3>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
