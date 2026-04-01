import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // 2. Create and save new user
    // Note: In a real production app, you should hash the password before saving!
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Log the error server-side for debugging, but don't send full stack trace to client
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "Error during registration",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Verify user and password (ensure no hardcoded comparison in production)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials provided." });
    }

    // 3. Use the secret from environment variables
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error(
        "CRITICAL: JWT_SECRET is not defined in environment variables.",
      );
      return res.status(500).json({ message: "Server configuration error." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal server error during authentication.",
    });
  }
};
