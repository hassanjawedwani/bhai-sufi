import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import "dotenv/config";
import { sendTokenResponse } from "../utils/authResponse.js";

export const login = async (req, res) => {
  console.log("login controller"); // ! production

  const { email, password } = req.body;

  console.log(email, password); // ! produciton

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, error: "Invalid email" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, error: "Password is required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User of this email don't exists" });
    }

    console.log(user);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Password is incorrect" });
    } else {
      sendTokenResponse(user, res, 200, "User Login Success");
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong, please try again later",
    });
  }
};

export const signup = async (req, res) => {
  console.log("signup controller"); // ! production

  const { fullname, email, password } = req.body;

  console.log(fullname, email, password); // ! produciton

  if (!fullname) {
    return res
      .status(400)
      .json({ success: false, error: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, error: "Password is required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, error: "Invalid email" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 6 character long",
    });
  }

  if (!/^\S+$/.test(password)) {
    return res
      .status(400)
      .json({ success: false, error: "Password can't contain any space" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    console.log("New user created:", newUser); // ! production

    const newUserWithoutPass = await User.findById(newUser._id);

    sendTokenResponse(newUserWithoutPass, res, 201, "Signup successful");
  } catch (err) {
    console.log("Database Error: ", err); // ! production

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: err.message || "All fields are required",
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "User already exist with this email",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Something went wrong with the database operation",
    });
  }
};

export const me = async (req, res) => {
  console.log("me route");
  const token = req.cookies.token;
  if (!token) {
    console.log(
      "cookie not found, user is not login, currentUser can't be initialized"
    ); // ! production
    res.status(401).json({
      success: false,
      error:
        "cookie not found, user is not login, currentUser can't be initialized",
    });
  } else {
    console.log(
      "user is login, but it is the time to check whether token is valid, if valid we will fetch data inside token" // ! production
    );
    try {
      const decodedTokenData = JWT.verify(token, process.env.JWT_PRIVATE_KEY);
      console.log("Decoded token data : ", decodedTokenData);               // ! production
      const userId = decodedTokenData.userId;

      const user = await User.findById(userId);
      res.status(200).json(user);
      
    } catch (err) {
      console.log( 
        "cookie found, but either token is expired, or some error occured: ",  // ! production
        err.message
      ); 
      res.status(401).json({success: false, error: err.message || "Please login first before continue"})
    }
  }
};
