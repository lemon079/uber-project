import { createContext } from "react";

const CaptainContext = ({children}) => {
  
  const CaptainDataContext = createContext();
  const captain = "";

  return (
    <>
      <CaptainDataContext.Provider value={captain}>
        {children}
      </CaptainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
