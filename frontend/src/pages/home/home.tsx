import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Axios } from "../../lib/api";
import axios from "axios";
import type { IMovie } from "../../types";

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

    Axios.get("/movies/upcoming")
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
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white border-b border-gray-700 shadow-md">
        <h1 className="text-2xl font-bold">MovieMate</h1>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-6">
          <li>
            <Link to="/movies" className="hover:underline">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/my-reviews" className="hover:underline">
              My Reviews
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-8 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover. Rate. Review.</h1>
        <p className="text-lg text-gray-300 mb-8">
          Join the community of movie lovers sharing honest opinions.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
            Browse Movies
          </button>
          <button className="bg-gray-800 border border-white px-6 py-3 rounded-xl hover:bg-gray-700 transition">
            Write a Review
          </button>
        </div>
      </section>

      {/* Featured Movies */}

      {error && <p className="text-red-700">{error}</p>}

      <section className="py-10 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Trending Movies
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((m) => (
            <div
              key={m.id}
              className="bg-white shadow-2xs rounded-xl overflow-hidden relative snap-start cursor-pointer group transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center rounded-xl">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  See More...
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{m.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(m.release_date).getFullYear()}
                </p>
                <p className="text-yellow-500 font-medium mb-2">
                  ⭐ {m.vote_average.toFixed(1)} / 10
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* upcomming with the hover on it*/}
      <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Upcoming Movies
        </h2>

        <div className="flex gap-6 py-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth">
          {upcomingMovies.map((m) => (
            <div
              key={m.id}
              className="relative px-2 shrink-0 w-48 sm:w-52 md:w-56 lg:w-60 snap-start cursor-pointer group transition-transform duration-300 hover:scale-105"
            >
              {/* Movie Poster */}
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />

                {/* Transparent Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center rounded-xl">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    See More...
                  </span>
                </div>
              </div>

              {/* Title + Rating */}
              <div className="mt-3 text-center">
                <h3 className="text-md font-semibold text-gray-800 truncate">
                  {m.title}
                </h3>
                {/* <p className="text-yellow-500 text-sm">
                  ⭐ {m.vote_average.toFixed(1)}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
