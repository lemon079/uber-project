import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain", // initially it will be none, only after accepting the ride it will be updated
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "cancelled", "accepted", "ongoing", "completed"],
    default: "pending",
  },
  duration: {
    type: Number, // in seconds
  },
  distance: {
    type: Number, // in meters
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
