import { Router } from "express";
import { body } from "express-validator";
import { handleCreateRide, handleGetFare } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  body("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid origin Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination Address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "bike", "auto"])
    .withMessage("Invalid vehicle type"),
  handleCreateRide
);

router.get("/fare", authUser, handleGetFare);

export default router;
