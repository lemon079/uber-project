import Ride from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";

export async function getFare(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  // Fetch distance and time using a helper function
  const distanceTime = await getDistanceTime(origin, destination);

  if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
    throw new Error("Invalid distance or time data received");
  }

  const baseFare = 50; // base fare in currency units
  const farePerKm = {
    car: 10, // fare per km for car
    bike: 5, // fare per km for bike
    auto: 7, // fare per km for auto
  };
  const farePerMinute = {
    car: 2, // fare per minute for car
    bike: 1, // fare per minute for bike
    auto: 1.5, // fare per minute for auto
  };

  // Parse distance in kilometers
  let distanceInKm = parseFloat(
    distanceTime.distance.replace(/[^\d.]/g, "") // Remove non-numeric characters
  );

  if (isNaN(distanceInKm)) {
    throw new Error("Failed to parse distance");
  }

  // Parse time in minutes (assuming the format "X mins")
  let timeInMinutes = parseFloat(
    distanceTime.time.replace(/[^\d.]/g, "") // Remove non-numeric characters
  );

  if (isNaN(timeInMinutes)) {
    throw new Error("Failed to parse time");
  }

  // Calculate fares for different vehicle types
  const fare = {
    car:
      baseFare +
      distanceInKm * farePerKm.car +
      timeInMinutes * farePerMinute.car,
    bike:
      baseFare +
      distanceInKm * farePerKm.bike +
      timeInMinutes * farePerMinute.bike,
    auto:
      baseFare +
      distanceInKm * farePerKm.auto +
      timeInMinutes * farePerMinute.auto,
  };

  fare.car = Math.round(fare.car);
  fare.bike = Math.round(fare.bike);
  fare.auto = Math.round(fare.auto);

  return fare;
}

export async function createRide(userId, origin, destination, vehicleType) {
  if (!userId || !origin || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(origin, destination); // an object
  const ride = await Ride.create({
    user: userId,
    origin,
    destination,
    fare: fare[vehicleType],
  });
  return ride;
}
