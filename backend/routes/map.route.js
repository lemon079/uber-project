import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { query } from "express-validator";
import {
  handleGetCoordinates,
  handleGetDistanceTime,
  handleAutoCompleteSuggestions,
} from "../controllers/map.controller.js";

const router = Router();

router.get(
  "/coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  handleGetCoordinates
);

router.get(
  "/distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  handleGetDistanceTime
);

router.get("/suggestions", authUser, handleAutoCompleteSuggestions);

export default router;
