import express from "express";
import mongoose, { connect } from "mongoose";
import authRouter from "./routes/authRoutes.js";
import "dotenv/config";
import connectDB from "./config/db.js";
const app = express();
const port = 8080;

connectDB();

app.use(express.json())
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});