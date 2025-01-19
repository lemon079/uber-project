import React, { useContext, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { UserDataContext } from "../../Context/UserContext";
import { SlArrowDown } from "react-icons/sl";
import { CaptainDataContext } from "../../Context/CaptainContext";
import initializeGsapDefaults from "../../utils/constants";

const ArrowDownAnimated = ({ panelType }) => {
  const arrowIconRef = useRef(null);
  const {
    isLocationPanelOpen,
    isVehiclePanelOpen,
    isConfirmRidePanelOpen,
    setIsLocationPanelOpen,
    setIsVehiclePanelOpen,
    setIsConfirmRidePanelOpen,
  } = useContext(UserDataContext);

  const { isRideRequestPanelOpen, setIsRideRequestPanelOpen } =
    useContext(CaptainDataContext);

  const getPanelState = () => {
    if (panelType === "LocationPanel") return isLocationPanelOpen;
    if (panelType === "VehiclePanel") return isVehiclePanelOpen;
    if (panelType === "ConfirmRidePanel") return isConfirmRidePanelOpen;
    if (panelType === "RideRequestPanel") return isRideRequestPanelOpen;
  };

  const togglePanelState = () => {
    if (panelType === "LocationPanel") {
      setIsLocationPanelOpen((prev) => !prev);
    } else if (panelType === "VehiclePanel") {
      setIsVehiclePanelOpen((prev) => !prev);
      // when current paneltype closes, previous paneltype opens
      if (isVehiclePanelOpen) {
        setIsLocationPanelOpen(true);
      }
    } else if (panelType === "ConfirmRidePanel") {
      setIsConfirmRidePanelOpen((prev) => !prev);
      // when current paneltype closes, previous paneltype opens
      if (isConfirmRidePanelOpen) {
        setIsVehiclePanelOpen(true);
      }
    } else if (panelType === "RideRequestPanel") {
      setIsRideRequestPanelOpen((prev) => !prev);
    }
  };

  useGSAP(() => {
    initializeGsapDefaults();
    const arrowRotation = getPanelState() ? "0deg" : "180deg";

    gsap.to(arrowIconRef.current, {
      rotate: arrowRotation,
    });
  }, [
    isLocationPanelOpen,
    isVehiclePanelOpen,
    isConfirmRidePanelOpen,
    isRideRequestPanelOpen,
  ]);

  return (
    <div
      ref={arrowIconRef}
      className="w-full rotate-[180deg] cursor-pointer mb-4"
      onClick={togglePanelState}
    >
      <SlArrowDown className="w-full" />
    </div>
  );
};

export default ArrowDownAnimated;
