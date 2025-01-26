import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SlArrowDown } from "react-icons/sl";
import { FaClock } from "react-icons/fa";
import VehicleCard from "../cards/VehicleCard";
import { UserDataContext } from "../../Context/UserContext";
import ArrowDownAnimated from "../shared/ArrowDownAnimated";
import initializeGsapDefaults from "../../utils/constants";
import axios from "axios";
import { SharedContextData } from "../../Context/Shared";
import Loading from "../shared/Loading";

const VehicleList = () => {
  const { isVehiclePanelOpen, setIsLocationPanelOpen } =
    useContext(UserDataContext);
  const { pickUpLocation, destination } = useContext(SharedContextData);
  const [fare, setFare] = useState({ car: 0, bike: 0, auto: 0 });
  const [loading, setLoading] = useState(false); // New loading state

  const vehicles = [
    {
      title: "UberGo",
      seats: 4,
      eta: "2 mins away",
      time: "15:24",
      description: "Affordable, compact rides",
      image: { url: "/assets/car.webp", alt: "Car" },
      fareKey: "car", // Mapping to `fare.car`
    },
    {
      title: "Bike",
      seats: 1,
      eta: "3 mins away",
      time: "15:20",
      description: "Quick and affordable rides for one",
      image: { url: "/assets/bike.webp", alt: "Bike" },
      fareKey: "bike", // Mapping to `fare.bike`
    },
    {
      title: "Auto",
      seats: 4,
      eta: "7 mins away",
      time: "15:35",
      description: "Comfortable and economical rides",
      image: { url: "/assets/auto.webp", alt: "Auto" },
      fareKey: "auto", // Mapping to `fare.auto`
    },
  ];

  const vehiclePanelRef = useRef(null);

  useGSAP(() => {
    initializeGsapDefaults();
    const vehiclePanelTranslateY = isVehiclePanelOpen ? "0%" : "100%";
    gsap.to(vehiclePanelRef.current, {
      translateY: vehiclePanelTranslateY,
      onStart: () => {
        setIsLocationPanelOpen(false);
      },
    });
  }, [isVehiclePanelOpen]);

  async function fetchFare(pickUpLocation, destination) {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/fare`,
        {
          params: { origin: pickUpLocation, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data); // Set the fare object { car, bike, auto }
    } catch (error) {
      console.error("Error fetching fare:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    if (pickUpLocation && destination) {
      fetchFare(destination, pickUpLocation);
    }
  }, [destination, pickUpLocation]);

  return (
    <section ref={vehiclePanelRef} className="active-panel translate-y-full">
      <ArrowDownAnimated panelType="VehiclePanel" />
      <div className="flex flex-col gap-5">
        <button className="w-fit flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-md">
          <FaClock className="text-black text-sm" />
          <span className="text-black text-sm font-medium">Leave Now</span>
          <SlArrowDown className="text-black text-sm" />
        </button>
        <div className="space-y-3">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              title={vehicle.title}
              seats={vehicle.seats}
              eta={vehicle.eta}
              time={vehicle.time}
              description={vehicle.description}
              price={
                loading ? <Loading /> : `Rs.${fare[vehicle.fareKey]}` // Show loading state
              }
              image={{ url: vehicle.image.url, alt: vehicle.image.alt }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleList;
