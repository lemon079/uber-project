import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDb from "./connection/db.connection.js";
import userRoutes from "./routes/user.route.js";
import mapRoutes from "./routes/map.route.js";
import rideRoutes from "./routes/ride.route.js";
import captainRoutes from "./routes/captain.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/ride", rideRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
