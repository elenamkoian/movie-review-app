import { useState, useEffect } from "react";
import type { IReview, IUser, IFavoriteMovie } from "../../types";
import { Axios } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { ResetLogin } from "./resetLogin";
import { ResetPassword } from "./resetPassword";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<IUser>();
  const [reviews, setReviews] = useState<IReview[]>();
  const [favorites, setFavorites] = useState<IFavoriteMovie[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/auth/user")
      .then((res) => setProfile(res.data.user))
      .catch(console.error);

    Axios.get("/auth/user/reviews/all")
      .then((res) => setReviews(res.data.reviews))
      .catch(console.error);

    Axios.get("/auth/user/favorites/all")
      .then((res) => setFavorites(res.data.favorites))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    Axios.post("/auth/logout")
      .then((res) => {
        toast.success(res.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Error during logout")
      );
  };

  const watchedMovies = favorites.filter((fav) => fav.watched);

  if (!profile)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  return (
    <div className="min-h-screen py-24 px-8 flex justify-center">
      <div className="bg-white w-full h-full max-w-2xl mt-20 rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-6">
          <img
            src="../src/assets/avatar.png"
            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.name} {profile.surname}
            </h1>

            <div className="flex gap-3 mt-5">
              <button
                className="bg-gray-800 flex-1 cursor-pointer text-white py-2 rounded-lg hover:bg-gray-600 transition"

              >
                Upload Avatar
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-300 flex-1 cursor-pointer text-black py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-gray-50 rounded-2xl py-6 px-4 shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Statistics
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {reviews ? reviews.length : 0}
              </p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>

            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {favorites ? favorites.length : 0}
              </p>
              <p className="text-sm text-gray-500">Saved Movies</p>
            </div>

            <div className="p-3 bg-white rounded-xl shadow">
              <p className="text-2xl font-bold text-gray-800">
                {watchedMovies ? watchedMovies.length : 0}
              </p>
              <p className="text-sm text-gray-500">Watched Movies</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-50 py-6 mt-8 px-4 rounded-2xl shadow-inner cursor-pointer">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition shadow-md"
          >
            {showSettings ? "Hide Settings" : "Show Settings"}
          </button>

          {showSettings && (
            <div className="mt-6 space-y-6">
              <ResetLogin />
              <hr className="border-gray-200" />
              <ResetPassword />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
