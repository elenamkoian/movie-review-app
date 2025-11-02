import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IMovieDetails } from "../../types";
import { AddReviewForm } from "./addReviewForm";

export const MovieView = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieDetails>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Ref to scroll to the review form
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Axios.get(`/movies/${id}`)
      .then((res) => setMovie(res.data.movie))
      .catch((err) => console.error(err));
  }, [id]);

  const handleWriteReviewClick = () => {
    setShowReviewForm(true);

    // Give React a moment to render the form before scrolling
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="flex flex-col">
      {movie && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white max-w-5xl mx-auto shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Poster */}
            <div className="md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie?.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                {/* Title and Tagline */}
                <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                {movie.tagline && (
                  <p className="text-gray-500 italic mb-2">"{movie.tagline}"</p>
                )}

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    >
                      {genre?.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {movie?.overview}
                </p>

                <div className="flex flex-wrap gap-4 text-gray-500 mb-4">
                  <p>Release Date: {movie.release_date}</p>
                  <p>
                    Language(s):{" "}
                    {movie.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(", ")}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="w-45 cursor-pointer rounded-lg px-4 py-2 bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:scale-105 hover:shadow-lg transition transform duration-200 ease-in-out">
                    Add to Favorites
                  </button>

                  <button
                    className="w-45 cursor-pointer rounded-lg px-4 py-2 bg-gray-700 text-white shadow-md hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition transform duration-200 ease-in-out"
                    onClick={handleWriteReviewClick}
                  >
                    Write Review
                  </button>
                </div>
              </div>

              {/* Footer: Rating, Runtime, Homepage */}
              <div className="flex items-center justify-between mt-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">★</span>
                  <p>{movie?.vote_average.toFixed(1)}</p>
                </div>
                <p>⏱️ {movie?.runtime} min</p>
                {movie?.homepage && (
                  <a
                    href={movie?.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    More Details
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div ref={formRef}>
          <AddReviewForm
            movieId={movie?.id}
            title={movie?.title}
            onCancel={() => setShowReviewForm(false)}
            // onSubmit={handleSubmitReview}
          />
        </div>
      )}
    </div>
  );
};
