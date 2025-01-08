import { validationResult } from "express-validator";
import User from "../models/user.models.js";
import BlackListToken from "../models/blackListToken.models.js";
import { createUser } from "../services/user.services.js";

async function handleUserRegister(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log("Error creating a user", error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function handleUserlogin(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = user.generateAuthToken();

  return res.status(200).json({ token, user });
}

async function handleUserLogout(req, res) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlackListToken.create({ token });

  return res.status(200).json({ message: "Logged Out" });
}

async function handleUserProfile(req, res) {
  res.status(200).json(req.user);
}

export {
  handleUserRegister,
  handleUserlogin,
  handleUserLogout,
  handleUserProfile,
};
