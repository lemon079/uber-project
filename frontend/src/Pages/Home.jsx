import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { SlArrowDown } from "react-icons/sl";
import LocationList from "../Components/LocationList";
import VehicleCard from "../Components/cards/VehicleCard";
import { FaClock } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import VehicleList from "../Components/VehicleList";

const Home = () => {
  gsap.registerPlugin(useGSAP);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const arrowIcon = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pickUpLocation: "",
      destination: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
  };

  useGSAP(() => {
    gsap.defaults({
      ease: "power2.out",
      duration: 0.5,
    });

    const panelHeight = isPanelOpen ? "100%" : "30%";
    const arrowRotation = isPanelOpen ? "0deg" : "180deg";

    gsap.to(panelRef.current, {
      height: panelHeight,
    });

    gsap.to(arrowIcon.current, {
      rotate: arrowRotation,
    });
  }, [isPanelOpen]);

  useGSAP(() => {
    const vehiclePanelTranslateY = isVehiclePanelOpen ? "0%" : "100%";

    gsap.to(vehiclePanelRef.current, {
      translateY: vehiclePanelTranslateY,
      onStart: () => {
        setIsPanelOpen(false);
      },
    });
  }, [isVehiclePanelOpen]);

  return (
    <section className="relative">
      <figure className="absolute w-16 top-10 left-5">
        <img src="/assets/logo-user.png" alt="logo" />
      </figure>
      <figure className="w-screen h-screen">
        <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <section
        ref={panelRef}
        className="flex flex-col p-5 gap-5 bg-white absolute bottom-0 left-0 w-full rounded-tl-3xl rounded-tr-3xl h-[30%]"
      >
        <div
          ref={arrowIcon}
          className="w-full rotate-[180deg] cursor-pointer"
          onClick={() => setIsPanelOpen((prev) => !prev)}
        >
          <SlArrowDown className="w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-extrabold">Find a trip</h2>
          <form
            className="flex flex-col gap-4 relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="line-container">
              <div className="line-container__circle "></div>
              <div className="line-container__line"></div>
              <div className="line-container__square"></div>
            </div>
            <input
              className="form-input px-16 py-4"
              id="pickUpLocation"
              type="text"
              placeholder="Enter Location"
              {...register("pickUpLocation", {
                required: "Pick-up location is required",
              })}
              onClick={() => setIsPanelOpen(true)}
            />
            {errors.pickUpLocation && <p>{errors.pickUpLocation.message}</p>}
            <input
              className="form-input px-16 py-4"
              id="destination"
              type="text"
              placeholder="Enter Destination"
              {...register("destination", {
                required: "Destination is required",
              })}
              onClick={() => setIsPanelOpen(true)}
            />
            {errors.destination && <p>{errors.destination.message}</p>}
            <button type="submit"></button>
          </form>
        </div>
        <div
          className={`${
            isPanelOpen ? "block h-[70%] overflow-y-scroll" : "hidden"
          }`}
        >
          <LocationList setIsVehiclePanelOpen={setIsVehiclePanelOpen} />
        </div>
      </section>

      <section
        ref={vehiclePanelRef}
        className="fixed bottom-0 left-0 w-full h-[55vh] z-10 bg-white translate-y-full"
      >
        <div className="m-5 flex flex-col gap-5">
          <button className="w-fit flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-md">
            <FaClock className="text-black text-sm" />
            <span className="text-black text-sm font-medium">Leave Now</span>
            <SlArrowDown className="text-black text-sm" />
          </button>
          <div className="flex flex-col gap-3">
            <VehicleList
              setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
