import { createContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState();
  const [isRideRequestPanelOpen, setIsRideRequestPanelOpen] = useState(false);

  return (
    <>
      <CaptainDataContext.Provider
        value={{
          captain,
          setCaptain,
          isRideRequestPanelOpen,
          setIsRideRequestPanelOpen,
        }}
      >
        {children}
      </CaptainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
