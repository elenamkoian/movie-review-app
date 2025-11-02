import bcrypt from 'bcrypt';
import User from "../models/user.js";
import Review from '../models/review.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  async signup(req, res) {
    let { name, surname, login, password } = req.body;
    try {
      if (!password || password.length < 6) {
        return res.status(400).send({ message: "Password must be at least 6 characters long" });
      }

      password = await bcrypt.hash(password, 10)
      const user = await User.create({ name, surname, login, password })

      return res.status(201).send({ message: "Successfully signed up", id: user.id });
    } catch (err) {
      return res.status(400).send({ message: err.message })
    }
  }

  async login(req, res) {
    const { login, password } = req.body;
    try {
      if (!login.trim() || !password.trim()) {
        return res.status(400).send({ message: "Missing credentials" })
      }
      const foundUser = await User.findOne({ login });
      if (!foundUser) {
        return res.status(404).send({ message: "User not found" })
      }

      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).send({ message: "Invalid Credentials" })
      }

      const token = jwt.sign({ user: foundUser }, process.env.JWT_SECRET, { expiresIn: "7d" })
      return res.status(200).send({ message: "Successful log in", token })
    } catch (err) {
      return res.status(500).send({ message: err.message })
    }
  }

  async getUser(req, res) {
    const user = req.user;
    try {
      const foundUser = await User.findById(user._id).select("-password");
      if (!foundUser) {
        return res.status(404).send({ message: "User not found" })
      }

      return res.status(200).send({ user: foundUser })
    } catch (err) {
      return res.status(500).send({ message: err.message })
    }
  }

  async logout(req, res) {
    try {
      // For JWT, logout is typically handled on the client side by deleting the token.
      return res.status(200).send({ message: "Successfully logged out" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  async getUserReviews(req, res) {
    try {
      const user = req.user; // assume req.user is already set by authentication middleware

      // Find all reviews where userId matches the logged-in user
      const reviews = await Review.find({ userId: user._id });

      return res.status(200).json({ message: "Fetched reviews", reviews });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }
}

export default new UserController();