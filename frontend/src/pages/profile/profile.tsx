import { Axios } from "../../lib/api";
import type { IReview, IUser, IFavoriteMovie } from "../../types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResetLogin } from "./resetLogin";
import { ResetPassword } from "./resetPassword";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<IUser>();
  const [reviews, setReviews] = useState<IReview[]>()
  const [favorites, setFavorites] = useState<IFavoriteMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/auth/user")
      .then((response) => setProfile(response.data.user))
      .catch((error) => console.error(error));

      Axios.get("/auth/user/reviews/all")
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((err) => console.error(err));

       Axios.get("/auth/user/favorites/all")
      .then((res) => setFavorites(res.data.favorites))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    Axios.post("/auth/logout")
    .then(response => {
      toast.success(response.data.message)
      localStorage.removeItem("token");
      navigate("/login")
    })
    .catch((err) => {
      toast.error(err.data.response.message || "Error during logout:", err)
    });
  };

  const watchedMovies = favorites.filter(fav => fav.watched)

  if (!profile)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  return (
    <div className="min-h-screen py-24 px-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-6">
          <img
            src="../src/assets/avatar.png"
            className="w-28c h-28 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.name} {profile.surname}
            </h1>

            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              <Link
                to="/profile/settings"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-center text-sm transition shadow-md"
              >
                Upload Avatar
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-300 cursor-pointer hover:bg-gray-400 text-black py-2 rounded-md text-sm transition shadow-md"
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

        <div className="w-full bg-white py-10 space-y-6">
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          <ResetLogin />
          <hr className="border-gray-200" />
          <ResetPassword />
        </div>
      </div>
    </div>
  );
};
