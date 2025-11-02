import express from "express";
import userController from "../controllers/userController.js";
import { isAusthenticated } from "../middlewares/isAuthenticated.js";

export const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/user", isAusthenticated, userController.getUser);
