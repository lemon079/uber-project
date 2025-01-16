import React from "react";

const Logo = ({ type = "User"}) => {
  return (
    <figure className="ml-7 mt-7 h-full">
      <img
        src={type === "User" ? "/assets/logo-user.png" : "/assets/logo-captain.png"}
        alt="logo"
        className={type === "User" ? "w-16 h-6" : "w-16 h-12"}
      />
    </figure>
  );
};

export default Logo;
