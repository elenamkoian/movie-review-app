import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Review from "../models/review.js";

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
    // add edit review
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

  //delete Review
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
}

export default new MovieController()