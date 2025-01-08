import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected To DB");
    })
    .catch(() => {
      console.log("Failed To Connect to DB");
    });
};

export default connectToDb;