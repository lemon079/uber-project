import React, { useContext, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SlArrowDown } from "react-icons/sl";
import { FaClock } from "react-icons/fa";
import VehicleCard from "../Components/cards/VehicleCard";
import { UserDataContext } from "../Context/UserContext";
import ArrowDownAnimated from "./shared/ArrowDownAnimated";

const VehicleList = () => {
  const {
    isVehiclePanelOpen,
    setIsVehiclePanelOpen,
    isLocationPanelOpen,
    setIsLocationPanelOpen,
  } = useContext(UserDataContext);

  const vehicles = [
    {
      title: "UberGo",
      seats: 4,
      eta: "2 mins away",
      time: "15:24",
      description: "Affordable, compact rides",
      price: "193.20",
      image: { url: "/assets/car.webp", alt: "Car" },
    },
    {
      title: "bike",
      seats: 1,
      eta: "3 mins away",
      time: "15:20",
      description: "Quick and affordable rides for one",
      price: "80.50",
      image: { url: "/assets/bike.webp", alt: "Bike" },
    },
    {
      title: "Auto",
      seats: 4,
      eta: "7 mins away",
      time: "15:35",
      description: "Comfortable and economical rides",
      price: "350.00",
      image: { url: "/assets/auto.webp", alt: "Auto" },
    },
  ];

  const vehiclePanelRef = useRef(null);

  useGSAP(() => {
    gsap.defaults({
      ease: "power2.out",
      duration: 0.5,
    });
    const vehiclePanelTranslateY = isVehiclePanelOpen ? "0%" : "100%";
    gsap.to(vehiclePanelRef.current, {
      translateY: vehiclePanelTranslateY,
      onStart: () => {
        setIsLocationPanelOpen(false);
      },
    });
  }, [isVehiclePanelOpen]);

  return (
    <section ref={vehiclePanelRef} className="active-panel">
      <ArrowDownAnimated panelType="VehiclePanel" />
      <div className="flex flex-col gap-5">
        <button className="w-fit flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-md">
          <FaClock className="text-black text-sm" />
          <span className="text-black text-sm font-medium">Leave Now</span>
          <SlArrowDown className="text-black text-sm" />
        </button>
        <div className="flex flex-col gap-3">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              title={vehicle.title}
              seats={vehicle.seats}
              eta={vehicle.eta}
              time={vehicle.time}
              description={vehicle.description}
              price={vehicle.price}
              image={{ url: vehicle.image.url, alt: vehicle.image.alt }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleList;
