import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Please provide a token" });
  }

  const [, token] = authHeader.split(" ");

  jwt.verify(token,process.env.JWT_SECRET, (err, data) => {
    if(err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.user = data.user;
    next();
  })
}