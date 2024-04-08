import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express(); 
app.use(express.json()); // allow my server to receive json ?
app.use(cookieParser()); // extract cookie from browser

// api/user a plusieurs routes gérer par mon routeur express
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error.'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

mongoose
  .connect(process.env.MONGODB_URL)
  .then(app.listen(3000, () => console.log("Listenning on port 3000...")))
  .catch((err) => console.log(err));
