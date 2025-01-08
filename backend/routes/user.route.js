import express from "express";
import { body } from "express-validator";
import {
  handleUserlogin,
  handleUserLogout,
  handleUserProfile,
  handleUserRegister,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
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
  ],
  handleUserRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Length must be 8 or more"),
  ],
  handleUserlogin
);

router.get("/profile", authUser, handleUserProfile);

router.get("/logout", authUser, handleUserLogout);

export default router;
