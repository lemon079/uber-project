import { createContext, useState } from "react";

export const SharedContextData = createContext();
const SharedContext = ({ children }) => {
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  return (
    <>
      <SharedContextData.Provider
        value={{ isConfirmRidePanelOpen, setIsConfirmRidePanelOpen }}
      >
        {children}
      </SharedContextData.Provider>
    </>
  );
};

export default SharedContext;
