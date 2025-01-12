import React from "react";

const Logo = ({ formType = "User"}) => {
  return (
    <figure className="ml-7 mt-7 h-full">
      <img
        src={formType === "User" ? "/logo-user.png" : "/logo-captain.png"}
        alt="logo"
        className={formType === "User" ? "w-16 h-6" : "w-16 h-12"}
      />
    </figure>
  );
};

export default Logo;
