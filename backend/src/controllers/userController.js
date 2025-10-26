import bcrypt from 'bcrypt';
import User from "../models/user.js"

class UserController {

  async getAll(req, res) {
    const users = await User.find()
    return res.send({users})
  }

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

  }

  async getUser(req, res) {

  }
}

export default new UserController();