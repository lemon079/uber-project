import { validationResult } from "express-validator";
import User from "../models/user.models.js";
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

export { handleUserRegister };
