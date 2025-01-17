import { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  

  return (
    <>
      <UserDataContext.Provider
        value={{
          user,
          setUser,
          isLocationPanelOpen,
          setIsLocationPanelOpen,
          isVehiclePanelOpen,
          setIsVehiclePanelOpen,
          isConfirmRidePanelOpen,
          setIsConfirmRidePanelOpen,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default UserContext;
