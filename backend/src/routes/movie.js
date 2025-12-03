import express from "express";
import movieController from "../controllers/movieController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getMovies)
movieRouter.get("/with-genres", movieController.getMoviesWithGenre);
movieRouter.get("/:id", movieController.getMovieById);

//reviews
movieRouter.post("/:id/review", isAuthenticated, movieController.addReview);
movieRouter.patch("/review/:id/edit", isAuthenticated, movieController.editReview);
movieRouter.delete("/review/:id", isAuthenticated, movieController.deleteReview);

//favorite
movieRouter.patch("/favorite/:id/toggle", isAuthenticated, movieController.toggleFavoriteWatched);
movieRouter.post("/:id/favorite", isAuthenticated, movieController.createFavorite);
movieRouter.delete("/favorites/:id", isAuthenticated, movieController.removeFavorite);

movieRouter.get("/:id/reviews/all", movieController.getAllMovieReviews)
movieRouter.get("/search/:searchText", movieController.searchMovie)

