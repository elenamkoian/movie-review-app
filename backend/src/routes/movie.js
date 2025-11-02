import express from "express";
import movieController from "../controllers/movieController.js";

export const movieRouter = express.Router()

movieRouter.get("/", movieController.getMovies)
// movieRouter.get("/upcoming", movieController.getUpcomingMovies)

// const trending = await fetchMovies("/trending/movie/week", 5);
// const nowPlaying = await fetchMovies("/movie/now_playing", 5);
// const latest = await fetchMovies("/movie/latest", 5);
// const discover = await fetchMovies("/discover/movie", 5);
// const byGenreAction = await fetchMovies("/discover/movie?with_genres=28", 5); // Action
// const byGenreComedy = await fetchMovies("/discover/movie?with_genres=35", 5); // Comedy
// const byGenreRomance = await fetchMovies("/discover/movie?with_genres=10749", 5); // Romance
// const byGenreHorror = await fetchMovies("/discover/movie?with_genres=27", 5); // Horror
// const byGenreAnimation = await fetchMovies("/discover/movie?with_genres=16", 5); // Animation
