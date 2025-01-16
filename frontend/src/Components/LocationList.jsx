import React from "react";
import LocationCard from "./cards/LocationCard";

const locations = [
  {
    title: "Third Wave Coffee",
    address:
      "Sarjapur - Marathahalli Road, Countryside Layout, Rainbow Drive, Bengaluru, Karnataka",
  },
  {
    title: "Starbucks",
    address: "MG Road, Bengaluru, Karnataka",
  },
  {
    title: "Cafe Coffee Day",
    address: "Brigade Road, Bengaluru, Karnataka",
  },
  {
    title: "Blue Tokai Coffee Roasters",
    address: "Koramangala, Bengaluru, Karnataka",
  },
  {
    title: "Hatti Kaapi",
    address: "Indiranagar, Bengaluru, Karnataka",
  },
];

const LocationList = ({ setIsVehiclePanelOpen }) => {
  return (
    <>
      {locations.map((location, index) => (
        <LocationCard
          key={index}
          title={location.title}
          address={location.address}
          setIsVehiclePanelOpen={setIsVehiclePanelOpen}
        />
      ))}
    </>
  );
};

export default LocationList;
