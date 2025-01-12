import { createContext } from "react";

const UserContext = ({ children }) => {
  
  const UserDataContext = createContext();
  const user = ''

  return (
    <UserDataContext.Provider value={user}>
        {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;