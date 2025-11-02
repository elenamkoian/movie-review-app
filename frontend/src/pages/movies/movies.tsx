import type { IMovie } from "../../types";
import { useState, useEffect } from "react";
import { Axios } from "../../lib/api";
import { useParams } from "react-router-dom";
import { MovieSection } from "../../components/movieSection/movieSection";

export const MoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (!category) return;

    const genreIdMap: Record<string, number> = {
      popular: 0,
      action: 28,
      comedy: 35,
      romance: 10749,
      animation: 16,
    };

    const genreId = genreIdMap[category.toLowerCase()];

    if (category.toLowerCase() === "upcoming") {
      Axios.get("/movies", { params: { category: "upcoming" } })
        .then((res) => setMovies(res.data.movies))
        .catch((err) => console.error(err));
    } else if (genreId) {
      Axios.get("/movies/with-genres", { params: { genreId } })
        .then((res) => setMovies(res.data.movies))
        .catch((err) => console.error(err));
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <MovieSection
         movies={movies}
         sectionTitle={`${category && category?.charAt(0).toUpperCase() + category?.slice(1)} Movies`} />
    </div>
  );
};
