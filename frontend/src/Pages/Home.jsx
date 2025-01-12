import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Components/shared/Logo";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-end bg-[url(/home.webp)] bg-left bg-cover bg-no-repeat">
      <Logo />
      <div className="bg-white p-4 flex flex-col gap-5 font-extrabold">
        <h2 className="text-2xl capitalize">Get Started With Uber</h2>
        <Link
          to={"/user/login"}
          className="text-lg text-center font-semibold w-full bg-black text-white p-2 mt-2 rounded"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
