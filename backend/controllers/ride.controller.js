import { validationResult } from "express-validator";
import { createRide, getFare } from "../services/ride.service.js";

async function handleCreateRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, origin, destination, vehicleType } = req.body;
  try {
    const ride = await createRide(userId, origin, destination, vehicleType);
    return res.status(200).json(ride);
  } catch (error) {
    console.error("Error creating ride:", error);
    return res.status(500).json({ message: "Error creating ride" });
  }
}

async function handleGetFare(req, res) {
  const { origin, destination } = req.query;
  try {
    const fare = await getFare(origin, destination);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error getting fare:", error);
    return res.status(500).json({ message: "Error getting fare" });
  }
}

export { handleCreateRide, handleGetFare };
