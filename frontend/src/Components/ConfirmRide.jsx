import React, { useContext, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { UserDataContext } from "../Context/UserContext";
import ArrowDownAnimated from "./shared/ArrowDownAnimated";
import { IoLocationSharp } from "react-icons/io5";
import { MdPinDrop } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const ConfirmRide = () => {
  const confirmRidePanelRef = useRef(null);

  const { isConfirmRidePanelOpen } = useContext(UserDataContext);

  // GSAP animation logic
  useGSAP(
    () => {
      gsap.defaults({
        ease: "power2.out",
        duration: 0.5,
      });
      const confirmRidePanelTranslateY = isConfirmRidePanelOpen ? "0%" : "100%";
      gsap.to(confirmRidePanelRef.current, {
        translateY: confirmRidePanelTranslateY,
      });
    },
    {
      scope: confirmRidePanelRef,
      dependencies: [isConfirmRidePanelOpen],
    }
  );

  return (
    <section ref={confirmRidePanelRef} className="active-panel">
      <ArrowDownAnimated panelType="ConfirmRidePanel" />
      <div className="flex flex-col items-center rounded-lg p-6 max-w-md mx-auto bg-white">
        {/* Car Icon */}
        <div className="mb-6">
          <img src="/assets/bike.webp" alt="Car" className="w-64 h-auto" />
        </div>

        {/* Ride Info */}
        <div className="w-full space-y-5">
          {/* Pickup Location */}
          <div>
            <div className="flex items-center space-x-5">
              <IoLocationSharp className="text-2xl" />
              <div className="space-y-1">
                <span className="block text-2xl font-extrabold">562/11-A</span>
                <span className="block text-sm text-gray-500">
                  Kaikondrahalli, Bengaluru, Karnataka
                </span>
              </div>
            </div>
          </div>

          {/* Drop-off Location */}
          <div>
            <div className="flex items-center space-x-5">
              <MdPinDrop className="text-3xl" />
              <div className="space-y-1">
                <span className="block text-2xl font-extrabold">
                  Third Wave Coffee
                </span>
                <span className="block text-sm text-gray-500">
                  17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout,
                  Bengaluru, Karnataka
                </span>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center space-x-5">
              <FaMoneyBillWave className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">₹193.20</span>
                <span className="text-sm text-gray-500">Cash Cash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmRide;
