import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationCard = ({ title, address, setIsVehiclePanelOpen }) => {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
      onClick={() => setIsVehiclePanelOpen((prev) => !prev)}
    >
      <div className="">
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
