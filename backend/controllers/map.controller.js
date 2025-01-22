import {
  getAddressCoordinate,
  getDistanceTime,
  getSuggestions,
} from "../services/maps.service.js";

async function handleGetCoordinates(req, res) {
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json({ message: "Coordinates Not Found" });
  }
}

async function handleGetDistanceTime(req, res) {
  const { origin, destination } = req.query;
  try {
    const distance = await getDistanceTime(origin, destination);
    return res.status(200).json(distance);
  } catch (error) {
    return res.status(404).json({ message: "Error Fetching Distance" });
  }
}

async function handleAutoCompleteSuggestions(req, res) {
  const { input } = req.query;
  try {
    const suggestions = await getSuggestions(input);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(404).json({ message: "Error Fetching Suggestions" });
  }
}


export { handleGetCoordinates, handleGetDistanceTime,handleAutoCompleteSuggestions };
