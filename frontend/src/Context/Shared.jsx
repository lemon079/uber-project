import { createContext, useState } from "react";

export const SharedContextData = createContext();

const SharedContext = ({ children }) => {
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <>
      <SharedContextData.Provider
        value={{
          isConfirmRidePanelOpen,
          setIsConfirmRidePanelOpen,
          pickUpLocation,
          setPickUpLocation,
          destination,
          setDestination,
        }}
      >
        {children}
      </SharedContextData.Provider>
    </>
  );
};

export default SharedContext;
