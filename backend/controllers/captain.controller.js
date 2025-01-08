import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import BlackListToken from "../models/blackListToken.model.js";

async function handleCaptainRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  try {
    const hashedPassword = await Captain.hashPassword(password);
    const isCaptainExist = await Captain.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({ message: "Captain already Exists" });
    }

    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      vehicleType: vehicle.vehicleType,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({ captain, token });
  } catch (error) {
    console.log("Error Creating Captain", error.message);
    return res.status(400).json({ message: error.message });
  }
}

async function handleCaptainLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;
}

async function handleCaptainLogout(req, res) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlackListToken.create({ token });
  return res.status(200).json({ message: "Logged Out" });
}

export { handleCaptainRegister, handleCaptainLogin, handleCaptainLogout };
