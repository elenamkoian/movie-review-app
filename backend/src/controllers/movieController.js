import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Review from "../models/review.js";
import Favorite from "../models/favorite.js"

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;

class MovieController {
  async getMovies(req, res) {
    const category = req.query.category || "popular";
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US`
      );

      const data = await result.json();
      const movies = data.results;

      return res.status(200).send({ movies })
    } catch (err) {
      return res.ststus(500).send({ message: err.message })
    }
  }

  async getMoviesWirhGenre(req, res) {
    const genreId = req.query.genreId;
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
      );

      const data = await result.json();
      const movies = data.results;

      return res.status(200).send({ movies })
    } catch (err) {
      return res.status(500).send({ message: err.message })
    }
  }

  async getMovieById(req, res) {
    const id = req.params.id;
    try {
      const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: API_KEY,
        }
      })

      return res.status(200).send({ movie: result.data });
    }
    catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async addReview(req, res) {
    const movieId = req.params.id;
    const description = req.body.description;
    const user = req.user;

    try {
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        }
      });

      const movieData = movieResponse.data;

      const newReview = await Review.create({
        description,
        userId: user._id,
        movie: movieData,
        edited: false,
      });

      return res.status(201).send({ message: "Review added successfully", review: newReview });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async editReview(req, res) {
    const reviewId = req.params.id;
    const description = req.body.description;
    const user = req.user;

    try {
      const result = await Review.updateOne(
        { _id: reviewId, userId: user._id }, // filter
        { $set: { description, edited: true } } // update
      );

      if (result.modifiedCount === 0) {
        return res.status(404).send({ message: "Review not found or not authorized" });
      }

      return res.status(200).send({ message: "Review edited successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteReview(req, res) {
    const reviewId = req.params.id
    const user = req.user

    try {
      const deleted = await Review.deleteOne({ _id: reviewId, userId: user._id })

      if (deleted.deletedCount === 0) {
        return res.status(404).send({ message: "Review can not be deleted" });
      }

      return res.status(200).send({ message: "Review deleted", deleteCount: deleted.deletedCount });
    } catch (error) {
      return res.staus(500).send({ message: error.message })
    }
  }

  async getUserReviews(req, res) {
    try {
      const user = req.user;

      const reviews = await Review.find({ userId: user._id });

      return res.status(200).json({ message: "Fetched reviews", reviews });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }

  async createFavorite(req, res) {
    const user = req.user;
    const movieId = req.params.id;

    try {
      const existingFavorite = await Favorite.findOne({
        userId: user._id,
        "movie.id": Number(movieId)
      });

      if (existingFavorite) {
        return res.status(400).send({ message: "Movie is already in favorites" });
      }

      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });

      const movieData = movieResponse.data;

      // create new favorite
      const favorite = await Favorite.create({
        userId: user._id,
        movie: movieData,
        watched: false,
        date: Date.now()
      });

      return res.status(201).send({ message: "Movie added to favorites successfully", favorite, });

    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async getFavorites(req, res) {
    const user = req.user;
    try {
      const favorites = await Favorite.find({ userId: user._id });

      if (!favorites) {
        return res.status(404).send({ message: "Favorites not found" })
      }

      return res.status(200).send({ message: "Favorites fetched successfully", favorites })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: error.message })
    }
  }

  async removeFavorite(req, res) {
    try {
      const favoriteId = req.params.id;
      const user = req.user;

      const favorite = await Favorite.findById(favoriteId);
      if (!favorite) {
        return res.status(404).send({ message: "Favorite not found" });
      }

      const deleted = await Favorite.deleteOne({ _id: favoriteId, userId: user._id })
      return res.status(200).send({ message: "Favorite movie deleted successfully", deletedCound: deleted.deletedCount })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }

  async toggleFavoriteWatched(req, res) {
    try {
      const favoriteId = req.params.id;
      const user = req.user;

      const favorite = await Favorite.findById(favoriteId);
      if (!favorite) {
        return res.status(404).send({ message: "Favorite not found" });
      }

      const updated = await Favorite.updateOne({ _id: favoriteId, userId: user._id }, { $set: { watched: !favorite.watched } })
      return res.status(200).send({ message: "Favorite movie status updated successfully", updated })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

export default new MovieController()