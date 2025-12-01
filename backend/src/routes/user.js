import express from "express";
import userController from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../services/upload.js";

export const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

userRouter.post("/user/avatar", isAuthenticated, upload.single("avatar"), userController.uploadAvatar);

userRouter.get("/users/search/:searchText", isAuthenticated, userController.getSearchUser);
userRouter.get("/user", isAuthenticated, userController.getUser);
userRouter.get("/user/:id", userController.getUserById)

userRouter.get("/user/favorites/all", isAuthenticated, userController.getUserFavorites)
userRouter.get("/user/:id/favorites/all", userController.getUserFavorites)

userRouter.get("/user/reviews/all", isAuthenticated, userController.getUserReviews)
userRouter.get("/user/:id/reviews/all", userController.getUserReviews)

userRouter.patch("/user/resetLogin", isAuthenticated, userController.resetLogin);
userRouter.patch("/user/resetPassword", isAuthenticated, userController.resetPassword);

