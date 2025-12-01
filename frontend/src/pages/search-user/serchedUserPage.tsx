import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IUser, IFavoriteMovie, IReview } from "../../types";
import { MovieCard } from "../../components/movieSection/movieCard";

export const SearchedUserPage = () => {
  const { id } = useParams();
  const [searchedUser, setSearchedUser] = useState<IUser>();
  const [userFavorites, setUserFavorites] = useState<IFavoriteMovie[]>([]);
  const [userReviews, setUserReviews] = useState<IReview[]>([]);
  const [activeTab, setActiveTab] = useState<"saved" | "reviews">("saved");

  useEffect(() => {
    if (!id) return;

    Axios.get(`/auth/user/${id}`)
      .then((res) => setSearchedUser(res.data.user))
      .catch(console.error);

    Axios.get(`/auth/user/${id}/favorites/all`)
      .then((res) => setUserFavorites(res.data.favorites))
      .catch(console.error);

    Axios.get(`/auth/user/${id}/reviews/all`)
      .then((res) => setUserReviews(res.data.reviews))
      .catch(console.error);
  }, [id]);

  if (!searchedUser)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  return (
    <div className="min-h-screen py-24 px-8 flex justify-center">
      <div className="bg-white w-full h-full max-w-2xl mt-20 rounded-3xl shadow-xl p-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${searchedUser.avatar}`}
            alt={searchedUser.name}
            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {searchedUser.name} {searchedUser.surname}
          </h1>
        </div>

        <div className="mt-10 bg-gray-50 rounded-2xl py-6 px-4 shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            User Statistics
          </h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {userReviews.length}
              </p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {userFavorites.length}
              </p>
              <p className="text-sm text-gray-500">Saved movies</p>
            </div>

            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {userFavorites.filter((fav) => fav.watched).length}
              </p>
              <p className="text-sm text-gray-500">Watched movies</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 py-2 rounded-md text-sm shadow-md transition cursor-pointer
              ${
                activeTab === "saved"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }
            `}
          >
            Saved
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-2 rounded-md text-sm shadow-md transition cursor-pointer
              ${
                activeTab === "reviews"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }
            `}
          >
            Reviews
          </button>
        </div>

        <div className="mt-10">
          {activeTab === "saved" ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Saved Movies
              </h2>
              {userFavorites.length === 0 ? (
                <p className="text-gray-500">No favorite movies.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userFavorites.map((fav) => (
                    <MovieCard movie={fav.movie} key={fav._id} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reviews
              </h2>
              {userReviews.length === 0 ? (
                <p className="text-gray-500">No reviews.</p>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-gray-100 p-4 rounded-xl shadow"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {review.movie.title}
                      </h3>
                      <p className="text-gray-700 mt-2">{review.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
