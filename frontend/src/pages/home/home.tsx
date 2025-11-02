import { useState, useEffect } from "react";
import { Axios } from "../../lib/api";
import axios from "axios";
import type { IMovie } from "../../types";
import { HeroSection } from "../layout/hero";
import { ScrollableMovieSection } from "../../components/scrollableMovieSection/scrollablemovieSection";
import { MovieSection } from "../../components/movieSection/movieSection";

export const HomePage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("/movies")
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const errorResp = err.response?.data;
          setError(errorResp.message || "Something went wrong");
        }
      });

    Axios.get("/movies", { params: { category: "upcoming" } })
      .then((response) => {
        setUpcomingMovies(response.data.movies);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const errorResp = err.response?.data;
          setError(errorResp.message || "Something went wrong");
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {error && <p className="text-red-700 text-center mt-6">{error}</p>}
      <HeroSection />

      <MovieSection
        movies={movies}
        sectionTitle="Trending movies"
      />

      <ScrollableMovieSection
        movies={upcomingMovies}
        sectionTitle="Upcoming movies"
      />
    </div>
  );
};
