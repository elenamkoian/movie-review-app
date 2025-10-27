import express from "express";
import movieController from "../controllers/movieController.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getPopularMovies)
movieRouter.get("/upcoming", movieController.getUpcomingMovies)
