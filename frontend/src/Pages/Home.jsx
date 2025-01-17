import React, { useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import LocationList from "../Components/LocationList";
import { useGSAP } from "@gsap/react";
import VehicleList from "../Components/VehicleList";
import ConfirmRide from "../Components/ConfirmRide";
import { UserDataContext } from "../Context/UserContext";
import ArrowDownAnimated from "../Components/shared/ArrowDownAnimated";

const Home = () => {
  const { isLocationPanelOpen, setIsLocationPanelOpen } =
    useContext(UserDataContext);

  const locationPanelRef = useRef(null);
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

    const panelHeight = isLocationPanelOpen ? "100%" : "30%";
    const arrowRotation = isLocationPanelOpen ? "0deg" : "180deg";

    gsap.to(locationPanelRef.current, {
      height: panelHeight,
    });

    gsap.to(arrowIcon.current, {
      rotate: arrowRotation,
    });
  }, [isLocationPanelOpen]);

  return (
    <section className="relative">
      <figure className="absolute w-16 top-10 left-5">
        <img src="/assets/logo-user.webp" alt="logo" />
      </figure>
      <figure className="w-screen h-screen">
        <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <section
        ref={locationPanelRef}
        className="flex flex-col p-5 gap-5 bg-white absolute bottom-0 left-0 w-full rounded-tl-3xl rounded-tr-3xl h-[30%]"
      >
        <ArrowDownAnimated panelType="LocationPanel" />
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
              onClick={() => setIsLocationPanelOpen(true)}
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
              onClick={() => setIsLocationPanelOpen(true)}
            />
            {errors.destination && <p>{errors.destination.message}</p>}
            <button type="submit"></button>
          </form>
        </div>
        <div
          className={`${
            isLocationPanelOpen ? "block h-[70%] overflow-y-scroll" : "hidden"
          }`}
        >
          <LocationList />
        </div>
      </section>
      <VehicleList />
      <ConfirmRide />
    </section>
  );
};

export default Home;
