import React, { useRef, useState } from "react";
import LocaotionSearchPanel from "../Components/LocaotionSearchPanel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SlArrowDown } from "react-icons/sl";

const Home = ({ type = "User" }) => {
  gsap.registerPlugin(useGSAP);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const arrowIcon = useRef(null);

  useGSAP(() => {
    gsap.defaults({
      ease: "power4.out",
      duration: 0.8,
    });

    const panelHeight = isPanelOpen ? "100%" : "25%";
    const arrowRotation = isPanelOpen ? "0deg" : "180deg";

    gsap.to(panelRef.current, {
      height: panelHeight,
    });

    gsap.to(arrowIcon.current, {
      rotate: arrowRotation,
    });
  }, [isPanelOpen]);

  return (
    <section className="relative">
      <figure className="absolute w-16 top-10 left-5">
        <img src="/logo-user.png" alt="logo" />
      </figure>
      <figure className="w-screen h-screen">
        <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <section
        ref={panelRef}
        className="flex flex-col  h-[25%] p-5 gap-10 bg-white absolute bottom-0 left-0 w-full rounded-tl-3xl rounded-tr-3xl"
      >
        <div
          ref={arrowIcon}
          className="w-full absolute top-3 left-[50%] translate-x-[-50%] rotate-[180deg]"
          onClick={() => setIsPanelOpen((prev) => !prev)}
        >
          <SlArrowDown className="w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-extrabold">Find a trip</h2>
            <form
              className="flex flex-col gap-5 relative"
              onClick={() => setIsPanelOpen(true)}
            >
              <div className="line-container">
                <div className="line-container__circle "></div>
                <div className="line-container__line"></div>
                <div className="line-container__square"></div>
              </div>
              <input
                className="form-input px-20 py-4"
                id="location"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
                className="form-input px-20 py-4"
                id="destination"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
          </div>
        </div>
        <div className={`${isPanelOpen ? "block" : "hidden"}`}>
          <LocaotionSearchPanel />
        </div>
      </section>
    </section>
  );
};

export default Home;
