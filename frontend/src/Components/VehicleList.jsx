import React from "react";
import VehicleCard from "./cards/VehicleCard";

const VehicleList = ({ setIsConfirmRidePanelOpen }) => {
  const vehicles = [
    {
      title: "UberGo",
      seats: 4,
      eta: "2 mins away",
      time: "15:24",
      description: "Affordable, compact rides",
      price: "193.20",
      image: "/assets/car.webp",
    },
    {
      title: "Motorcycle",
      seats: 1,
      eta: "3 mins away",
      time: "15:20",
      description: "Quick and affordable rides for one",
      price: "80.50",
      image: "/assets/motorcycle.webp", // Replace with your motorcycle image URL
    },
    {
      title: "Auto",
      seats: 3,
      eta: "5 mins away",
      time: "15:30",
      description: "Comfortable and economical rides",
      price: "120.75",
      image: "/assets/auto.webp", // Replace with your auto image URL
    },
  ];

  return (
    <>
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={index}
          title={vehicle.title}
          seats={vehicle.seats}
          eta={vehicle.eta}
          time={vehicle.time}
          description={vehicle.description}
          price={vehicle.price}
          image={vehicle.image}
          setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}
        />
      ))}
    </>
  );
};

export default VehicleList;
