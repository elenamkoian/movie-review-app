import bcrypt from 'bcrypt';
import User from "../models/user.js";
import Favorite from "../models/favorite.js"
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

      const token = jwt.sign({ user: foundUser }, process.env.JWT_SECRET, { expiresIn: "1h" })
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

  async uploadAvatar(req, res) {
    try {
      const id = req.user._id;
      const user = await User.findById(id);

      user.avatar = req.file.filename;
      await user.save();

      return res.status(200).send({ message: "Avatar uploaded successfully", avatar: req.file.filename } );
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      return res.status(200).send({ message: "Successfully logged out" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  //for both logged in user and searched user
  async getUserReviews(req, res) {
    try {
      const userId = req.params.id || req.user?._id;
      const reviews = await Review.find({ userId });

      return res.status(200).send({ message: "Fetched reviews", reviews });
    } catch (err) {
      return res.status(500).send({ message: "Failed to fetch reviews" });
    }
  }

  //for both logged in user and searched user
  async getUserFavorites(req, res) {
    try {
      const userId = req.params.id || req.user?._id;
      const favorites = await Favorite.find({ userId });

      if (!favorites) {
        return res.status(404).send({ message: "Favorites not found" })
      }

      return res.status(200).send({ message: "Favorites fetched successfully", favorites })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async resetLogin(req, res) {
    try {
      const { password, newLogin } = req.body;
      const user = req.user;

      const existingUser = await User.findOne({ login: newLogin });
      if (existingUser) {
        return res.status(400).send({ message: "Login is busy" })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Incorrect password" });
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { login: newLogin } })

      return res.status(200).send({ message: "User login updated successfully", user: updatedUser })

    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async resetPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = req.user;

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Incorrect password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } })

      return res.status(200).send({ message: "Password updated successfully", user: updatedUser })

    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async getSearchUser(req, res) {
    const { user } = req;
    try {
      const { searchText } = req.params;
      const users = await User.find({
        _id: { $ne: user._id},
        $or: [
          { name: { $regex: searchText, $options: "i" } },
          { surname: { $regex: searchText, $options: "i" } }
        ]
      });

      return res.status(200).send({ meassage: "Users fetched successfully", users })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params
      let user = await User.findById({_id: id})

      return res.status(200).send({ message: "User fetched successfully", user })
    } catch(error) {
       return res.status(400).send({ message: "The user is not found"})
    }
  }
}

export default new UserController();