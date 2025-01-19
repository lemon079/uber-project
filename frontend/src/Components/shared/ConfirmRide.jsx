import React, { useContext, useRef } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { gsap } from "gsap";
import { MdPinDrop } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { CaptainDataContext } from "../../Context/CaptainContext";
import { useGSAP } from "@gsap/react";
import initializeGsapDefaults from "../../utils/constants";
import { SharedContextData } from "../../Context/Shared";
import { UserDataContext } from "../../Context/UserContext";

const ConfirmRide = ({ type }) => {
  const confirmRidePanelRef = useRef(null);
  const { setIsRideRequestPanelOpen } = useContext(CaptainDataContext);
  const { setIsVehiclePanelOpen } = useContext(UserDataContext);

  const { isConfirmRidePanelOpen, setIsConfirmRidePanelOpen } =
    useContext(SharedContextData);

  // Update the GSAP animation based on isConfirmRidePanelOpen
  useGSAP(() => {
    initializeGsapDefaults();
    gsap.to(confirmRidePanelRef.current, {
      translateY: isConfirmRidePanelOpen ? "0%" : "100%",
    });
  }, [isConfirmRidePanelOpen]);

  // Conditional data for User or Captain
  const imageUrl =
    type === "User"
      ? "https://example.com/user-image.jpg" // Example user image
      : "https://example.com/captain-image.jpg"; // Example captain image

  const name = type === "User" ? "Captain John Doe" : "Harsh Patel"; // Name based on type
  const distance = type === "User" ? "10.5 KM" : "2.2 KM"; // Distance based on type

  const pickupLocation = (
    <>
      <span className="block text-2xl font-extrabold">562/11-A</span>
      <span className="block text-sm text-gray-500">
        Kaikondrahalli, Bengaluru, Karnataka
      </span>
    </>
  );

  const dropOffLocation = (
    <>
      <span className="block text-2xl font-extrabold">Third Wave Coffee</span>
      <span className="block text-sm text-gray-500">
        17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
        Karnataka
      </span>
    </>
  );

  const price = "₹193.20"; // Price based on type

  return (
    <section
      ref={confirmRidePanelRef}
      className="active-panel translate-y-full"
    >
      <h2 className="text-2xl font-extrabold mb-3">
        {type === "User" ? "Confirm Your Ride?" : "Confirm Ride Details?"}
      </h2>
      <div className="flex flex-col items-center rounded-lg max-w-md mx-auto px-4">
        <div className="confirm-ride__passenger flex items-center justify-between w-full mb-6">
          <img
            src={imageUrl}
            alt={type === "User" ? "Captain" : "User"}
            className="rounded-full w-20 h-20 object-cover"
          />
          <div className="flex-1 ml-4">
            <h3 className="text-2xl font-extrabold">{name}</h3>
            <span className="text-sm text-gray-500">{distance}</span>
          </div>
        </div>

        <div className="confirm-ride__info w-full space-y-8">
          <div>
            <div className="flex items-center space-x-5">
              <IoLocationSharp className="text-2xl" />
              <div className="space-y-1">{pickupLocation}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-5">
              <MdPinDrop className="text-3xl" />
              <div className="space-y-1">{dropOffLocation}</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center space-x-5">
              <FaRupeeSign className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">{price}</span>
                <span className="text-sm text-gray-500">Cash Cash</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 mt-6">
          <button
            className="w-full bg-black text-white p-3 rounded-lg uppercase"
            onClick={() => {}}
          >
            {type === "User" ? "Confirm" : "Start Ride"}
          </button>
          <button
            className="w-full bg-gray-200 text-black p-3 rounded-lg uppercase"
            onClick={() => {
              setIsConfirmRidePanelOpen(false);
              if (type === "User") {
                setIsVehiclePanelOpen(true);
              } else {
                setIsRideRequestPanelOpen(true);
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmRide;
