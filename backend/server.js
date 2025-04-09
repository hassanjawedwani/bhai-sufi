import express from "express";
import mongoose, { connect } from "mongoose";
import authRouter from "./routes/authRoutes.js";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

connectDB();

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});