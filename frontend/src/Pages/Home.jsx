import React, { useRef, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import LocationList from "../Components/user/LocationList";
import { useGSAP } from "@gsap/react";
import VehicleList from "../Components/user/VehicleList";
import { UserDataContext } from "../Context/UserContext";
import ArrowDownAnimated from "../Components/shared/ArrowDownAnimated";
import CaptainStats from "../Components/captain/CaptainStats";
import initializeGsapDefaults from "../utils/constants";
import RideRequest from "../Components/captain/RideRequest";
import ConfirmRide from "../Components/shared/ConfirmRide";

const Home = ({ type }) => {
  const { isLocationPanelOpen, setIsLocationPanelOpen } =
    useContext(UserDataContext);

  const { handleSubmit } = useForm();

  const locationPanelRef = useRef();
  const arrowIcon = useRef();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
  };

  useGSAP(() => {
    initializeGsapDefaults();
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
      {type === "User" ? (
        <section
          ref={locationPanelRef}
          className="flex flex-col p-5 gap-5 bg-white absolute bottom-0 left-0 w-full rounded-t-3xl h-[30%]"
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
                onClick={() => setIsLocationPanelOpen(true)}
              />
              <input
                className="form-input px-16 py-4"
                id="destination"
                type="text"
                placeholder="Enter Destination"
                onClick={() => setIsLocationPanelOpen(true)}
              />
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
          <VehicleList />
          <ConfirmRide type="User" />
          {/*
              these two lines dont execute panel going back animation , but make the component load only when needed 
              {isVehiclePanelOpen && <VehicleList />}
              {isUserConfirmRidePanelOpen && <ConfirmRide type="User" />}
            */}
        </section>
      ) : (
        type === "Captain" && (
          // captain home
          <section className="p-5 bg-white absolute bottom-0 left-0 w-full rounded-t-3xl">
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <figure className="w-16 h-16 flex items-center gap-4">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                    alt="user"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <div className="capitalize font-extrabold text-2xl">
                  <h2>John Doe</h2>
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-2xl">₹295.53</h3>
                <h4 className="text-gray-500 text-right">Earned</h4>
              </div>
            </section>
            <section className="mt-5">
              <CaptainStats />

              <RideRequest />
              <ConfirmRide type={"Captain"} />
              {/*
              these two lines dont execute panel going back animation , but make the component load only when needed 
              {isRideRequestPanelOpen && <RideRequest />}
              {isCaptainConfirmRidePanelOpen && <ConfirmRide type={"Captain"} />}
               */}
            </section>
          </section>
        )
      )}
    </section>
  );
};

export default Home;
