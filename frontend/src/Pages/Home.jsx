import React, { useRef, useContext, useState } from "react";
import { gsap } from "gsap";
import { UserDataContext } from "../Context/UserContext";
import ArrowDownAnimated from "../Components/shared/ArrowDownAnimated";
import CaptainStats from "../Components/captain/CaptainStats";
import initializeGsapDefaults from "../utils/constants";
import RideRequest from "../Components/captain/RideRequest";
import ConfirmRide from "../Components/shared/ConfirmRide";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGSAP } from "@gsap/react";
import SetLocation from "../Components/user/SetLocation";
import VehicleList from "../Components/user/VehicleList";
import { SharedContextData } from "../Context/Shared";

const Home = ({ type }) => {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194]); // Default center
  const [isLocationFetched, setIsLocationFetched] = useState(false); // Track user action
  const { pickUpLocation, setPickUpLocation, destination, setDestination } =
    useContext(SharedContextData);
  const [activeInput, setActiveInput] = useState("");

  const {
    isLocationPanelOpen,
    setIsLocationPanelOpen,
    isVehiclePanelOpen,
    setIsVehiclePanelOpen,
  } = useContext(UserDataContext);

  const locationPanelRef = useRef();
  const arrowIcon = useRef();

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setIsLocationFetched(true);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert(
            "Unable to fetch location. Please check your browser settings."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useGSAP(() => {
    initializeGsapDefaults();
    const panelHeight = isLocationPanelOpen ? "100%" : "30%";
    const arrowRotation = isLocationPanelOpen ? "0deg" : "180deg";

    gsap.to(locationPanelRef.current, {
      height: panelHeight,
    });

    gsap.to(arrowIcon.current, {
      rotate: arrowRotation,
    });
  }, [isLocationPanelOpen]);

  return (
    <section className="relative flex flex-col">
      <figure className="absolute w-16 top-10 left-5">
        <img src="/assets/logo-user.webp" alt="logo" />
      </figure>

      {!isLocationFetched ? (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
          <button
            onClick={handleFetchLocation}
            className="bg-gray-300 font-extrabold px-6 py-3 rounded-lg"
          >
            Fetch My Location
          </button>
        </div>
      ) : (
        <MapContainer
          className="w-full h-screen z-0"
          center={userLocation}
          zoom={17}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation}>
            <Popup>
              You are here! <br /> Latitude: {userLocation[0]} <br /> Longitude:{" "}
              {userLocation[1]}
            </Popup>
          </Marker>
        </MapContainer>
      )}

      {type === "User" ? (
        <section
          ref={locationPanelRef}
          className="flex flex-col p-5 gap-5 bg-white absolute bottom-0 left-0 w-full rounded-t-3xl"
        >
          <ArrowDownAnimated panelType="LocationPanel" />
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-extrabold">Find a trip</h2>
            <form className="flex flex-col gap-4 relative">
              <div className="line-container">
                <div className="line-container__circle"></div>
                <div className="line-container__line"></div>
                <div className="line-container__square"></div>
              </div>
              <input
                className="form-input px-16 py-4"
                id="pickUpLocation"
                type="text"
                placeholder="Enter Pick Up Location"
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
                onClick={() => {
                  setIsLocationPanelOpen(true);
                  setActiveInput("pickUpLocation");
                }}
              />
              <input
                className="form-input px-16 py-4"
                id="destination"
                type="text"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onClick={() => {
                  setIsLocationPanelOpen(true);
                  setActiveInput("destination");
                }}
              />
            </form>
            <button
              disabled={pickUpLocation?.length < 3 || destination?.length < 3}
              className={`${
                !isLocationPanelOpen ? "hidden" : "block"
              } bg-black text-white font-extrabold px-6 py-3 rounded-lg disabled:bg-gray-500`}
              onClick={() => setIsVehiclePanelOpen(true)}
            >
              Find Ride
            </button>
          </div>
          <div
            className={`${
              isLocationPanelOpen ? "block h-[70%] overflow-y-scroll" : "hidden"
            }`}
          >
            {activeInput === "pickUpLocation" &&
              pickUpLocation?.length >= 3 && (
                <SetLocation
                  location={pickUpLocation}
                  setLocation={setPickUpLocation}
                />
              )}
            {activeInput === "destination" && destination?.length >= 3 && (
              <SetLocation
                location={destination}
                setLocation={setDestination}
              />
            )}
          </div>
          {isVehiclePanelOpen && <VehicleList />}
          <ConfirmRide type="User" />
        </section>
      ) : (
        type === "Captain" && (
          <section className="p-5 bg-white absolute bottom-0 left-0 w-full rounded-t-3xl">
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <figure className="w-16 h-16 flex items-center gap-4">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                    alt="user"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <div className="capitalize font-extrabold text-2xl">
                  <h2>John Doe</h2>
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-2xl">₹295.53</h3>
                <h4 className="text-gray-500 text-right">Earned</h4>
              </div>
            </section>
            <section className="mt-5">
              <CaptainStats />

              <RideRequest />
              <ConfirmRide type={"Captain"} />
            </section>
          </section>
        )
      )}
    </section>
  );
};

export default Home;
