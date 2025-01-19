import React, { useState, useContext, useRef } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { gsap } from "gsap";
import { MdPinDrop } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import ArrowDownAnimated from "../shared/ArrowDownAnimated";
import { CaptainDataContext } from "../../Context/CaptainContext";
import { useGSAP } from "@gsap/react";
import initializeGsapDefaults from "../../utils/constants";
import { SharedContextData } from "../../Context/Shared";

const RideRequest = () => {
  const rideRequestPanelRef = useRef(null);
  const rideRequestInfoRef = useRef(null); // Reference for the ride info section
  const { isRideRequestPanelOpen, setIsRideRequestPanelOpen } =
    useContext(CaptainDataContext); // Updated context value

  const { setIsConfirmRidePanelOpen } = useContext(SharedContextData);
  const [isContentVisible, setIsContentVisible] = useState(false); // State for toggling content visibility

  useGSAP(() => {
    initializeGsapDefaults();
    gsap.to(rideRequestPanelRef.current, {
      translateY: isRideRequestPanelOpen ? "0%" : "100%", // Updated condition
    });
  }, [isRideRequestPanelOpen]);

  // Consolidated animation function to handle both showing and hiding content
  const toggleContent = () => {
    setIsContentVisible((prev) => !prev);
  };

  return (
    <section
      ref={rideRequestPanelRef}
      className="ride-request h-screen translate-y-full"
    >
      <ArrowDownAnimated panelType="RideRequestPanel" />
      <h2 className="ride-request__header">New Ride Request Available!</h2>
      <div className="border-2 border-gray-500 rounded-xl p-3 flex flex-col gap-8">
        {/* Passenger Info */}
        <div className="ride-request__passenger" onClick={toggleContent}>
          <img
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="Passenger"
            className="ride-request__avatar"
          />
          <div className="flex-1">
            <h3 className="ride-request__name">Harsh Patel</h3>
          </div>
          <span className="ride-request__distance">2.2 KM</span>
        </div>

        {/* Conditional Content Display with GSAP Animation */}
        {isContentVisible && (
          <>
            <div ref={rideRequestInfoRef} className="ride-request__info">
              <div className="ride-request__row ride-request__row--bordered">
                <IoLocationSharp className="ride-request__icon" />
                <span className="ride-request__text">
                  562/11-A,
                  <p>asdasdasfasf</p>
                </span>
              </div>
              <div className="ride-request__row ride-request__row--bordered">
                <MdPinDrop className="ride-request__icon" />
                <span className="ride-request__text">
                  562/11-A,
                  <p>asdasdasfasf</p>
                </span>
              </div>
              <div className="ride-request__row">
                <FaRupeeSign className="ride-request__icon" />
                <span className="ride-request__text">
                  193.20
                  <p>Cash Cash</p>
                </span>
              </div>
            </div>

            {/* Actions Section with GSAP Animation */}
            <div className="ride-request__actions">
              <button
                className="ride-request__button ride-request__button--confirm"
                onClick={() => {
                  setIsRideRequestPanelOpen(false);
                  setIsConfirmRidePanelOpen(true);
                }}
              >
                Accept
              </button>
              <button className="ride-request__button ride-request__button--ignore">
                Ignore
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RideRequest;
