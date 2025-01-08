import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDb from "./connection/db.connection.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
