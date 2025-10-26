import bcrypt from 'bcrypt';
import User from "../models/user.js";
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
      if(!login.trim() || !password.trim()) {
        return res.status(400).send({ message: "Missing credentials" })
      }
      const foundUser = await User.findOne({ login });
      if(!foundUser) {
        return res.status(404).send({ message: "User not found" })
      }

      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
      if(!isPasswordCorrect) {
        return res.status(400).send({ message: "Invalid Credentials" })
      }

      const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
      return res.status(200).send({ message: "Successful log in", token })
    } catch(err) {
       return res.status(500).send({ message: err.message })
    }
  }

  async getUser(req, res) {

  }
}

export default new UserController();