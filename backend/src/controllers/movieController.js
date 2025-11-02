import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";

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
}

export default new MovieController()