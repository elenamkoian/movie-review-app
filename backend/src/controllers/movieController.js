import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;

class MovieController {
  async getPopularMovies(req, res) {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&gape=1`
      );

      const data = await result.json();
      const movies = data.results;

      return res.status(200).send({ movies })
    } catch(err) {
      return res.ststus(500).send({ message: err.message})
    }
  }

  async getUpcomingMovies(req, res) {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&gape=1`
      );

      const data = await result.json();
      const movies = data.results;

      return res.status(200).send({ movies })
    } catch(err) {
      return res.ststus(500).send({ message: err.message})
    }
  }

}

export default new MovieController()