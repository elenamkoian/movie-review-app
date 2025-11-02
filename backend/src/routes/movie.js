import express from "express";
import movieController from "../controllers/movieController.js";
import { isAusthenticated } from "../middlewares/isAuthenticated.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getMovies)
movieRouter.get("/with-genres", movieController.getMoviesWirhGenre);
movieRouter.get("/:id", movieController.getMovieById);

movieRouter.post("/:id/review", isAusthenticated, movieController.addReview);
movieRouter.patch("/review/:id/edit", isAusthenticated, movieController.editReview);
movieRouter.delete("/review/:id", isAusthenticated, movieController.deleteReview)

