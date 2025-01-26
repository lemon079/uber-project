import axios from "axios";

export const getAddressCoordinate = async (address) => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

export async function getDistanceTime(origin, destination) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(
    destination
  )}&origins=${encodeURIComponent(origin)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const { distance, duration, status } = response.data.rows[0].elements[0];
      if (status !== "OK") throw new Error("Route Not Found");
      return { distance: distance.text, time: duration.text };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
}

export async function getSuggestions(input) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&region=pk&key=${API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
}
