import express from "express";
import userController from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);