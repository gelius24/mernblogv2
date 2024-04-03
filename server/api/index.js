import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(app.listen(3000, () => console.log("Listenning on port 3000...")))
  .catch((err) => console.log(err));
