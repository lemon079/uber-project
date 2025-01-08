import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { handleUserRegister } from "../controllers/user.controllers.js";

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

router.post("/login", () => {});

router.get("/logout", () => {});

export default router;
