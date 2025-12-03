import { useState } from "react";
import type { IMovie } from "../../types";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";
import { getMovieYear } from "../../utils/getMovieYear";
import { getGenreIdByName } from "../../utils/getGenreIdByName";
import { MovieCard } from "../../components/movieSection/movieCard";

export const SearchMoviePage = () => {
  const [searchText, setSearchText] = useState("");
  const [genre, setGenre] = useState("All");
  const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([]);
  const [moviesToShow, setMoviesToShow] = useState<IMovie[]>([]);
  const [year, setYear] = useState<number | "">("");

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    Axios.get(`/movies/search/${searchText}`)
      .then((response) => {
        const movies = response.data.movies;
        setSearchedMovies(movies);
        setMoviesToShow(movies);
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Something went wrong")
      );

    setGenre("All");
    setYear("");
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = parseInt(e.target.value);
    const currentYear = new Date().getFullYear();

    if (inputYear > currentYear) {
      setYear(currentYear);
    } else {
      setYear(e.target.value ? inputYear : "");
    }
  };

  const handleFilter = () => {
    const filteredMovies = searchedMovies.filter((movie) => {
      const movieYear = getMovieYear(movie);
      const yearMatch = movieYear && year ? movieYear === year : true;

      const matchGenres =
        genre === "All" || movie.genre_ids.includes(getGenreIdByName(genre));

      return yearMatch && matchGenres;
    });

    setMoviesToShow(filteredMovies);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center py-24 px-8">
      <div className="grid grid-cols-[1fr_300px] gap-8 w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Search Movies</h2>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchText}
              onChange={(ev) => setSearchText(ev.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition hover:shadow-lg hover:scale-105"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 overflow-y-auto px-2 pt-3 pb-5">
            {moviesToShow.length ? (
              moviesToShow.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                {searchText
                  ? "No movies found."
                  : "Search for a movie to begin."}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-80 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
              >
                <option>All</option>
                <option>Action</option>
                <option>Adventure</option>
                <option>Animation</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Fantacy</option>
                <option>Horror</option>
                <option>History</option>
                <option>Science Fiction</option>
                <option>Thriller</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Year</label>
              <input
                value={year}
                onChange={handleYearSelect}
                type="number"
                placeholder="e.g. 2020"
                max={new Date().getFullYear()}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
              />
            </div>

            <button
              onClick={handleFilter}
              className="w-full bg-gray-800 cursor-pointer text-white rounded-lg py-2 hover:bg-gray-600 transition hover:shadow-lg hover:scale-105"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
