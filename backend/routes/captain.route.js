import express from "express";
import { body } from "express-validator";
import {} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  handleCaptainLogin,
  handleCaptainLogout,
  handleCaptainRegister,
} from "../controllers/captain.controller.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name Must be atleast 3 characters long"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last Name Must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Length must be 8 or more"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 character"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle number plate must be atleast 3 numbers"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  handleCaptainRegister
);

router.get("/logout", authUser, handleCaptainLogout);

export default router;
