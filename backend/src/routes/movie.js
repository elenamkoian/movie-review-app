import express from "express";
import movieController from "../controllers/movieController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getMovies)
movieRouter.get("/with-genres", movieController.getMoviesWirhGenre);
movieRouter.get("/:id", movieController.getMovieById);

//review
movieRouter.post("/:id/review", isAuthenticated, movieController.addReview);
movieRouter.patch("/review/:id/edit", isAuthenticated, movieController.editReview);
movieRouter.delete("/review/:id", isAuthenticated, movieController.deleteReview)
movieRouter.get("/all/reviews", isAuthenticated, movieController.getUserReviews);

//favorite
movieRouter.patch("/favorite/:id/toggle", isAuthenticated, movieController.toggleFavoriteWatched)
movieRouter.post("/:id/favorite", isAuthenticated, movieController.createFavorite)
movieRouter.get("/all/favorites", isAuthenticated, movieController.getFavorites)
movieRouter.delete("/favorites/:id", isAuthenticated, movieController.removeFavorite)

