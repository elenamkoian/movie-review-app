import express from "express";
import movieController from "../controllers/movieController.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getMovies)
movieRouter.get("/with-genres", movieController.getMoviesWirhGenre);
movieRouter.get("/:id", movieController.getMovieById);
