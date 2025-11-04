import { useEffect, useState } from "react";
import type { IFavoriteMovie } from "../../types";
import { FavoritesFilter } from "./favoritesFilter";
import { FavoriteMovieCard } from "./favoriteMovieCard";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<IFavoriteMovie[]>([]);
  const [filter, setFilter] = useState<"all" | "watched" | "unwatched">("all");

  useEffect(() => {
    Axios.get("/movies/all/favorites")
      .then((res) => setFavorites(res.data.favorites))
      .catch(console.error);
  }, []);

  const filteredFavorites = favorites.filter((f) => {
    if (filter === "all") return true;
    if (filter === "watched") return f.watched;
    if (filter === "unwatched") return !f.watched;
  });

  const handleDeletFavorite = (id: string) => {
    Axios.delete(`/movies/favorites/${id}`)
      .then((response) => {
        setFavorites(favorites.filter((f) => f._id != id));
        toast.success(response.data.message || "Successfully deleted");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleToggleMovieStatus = (id: string) => {
    Axios.patch(`/movies/favorite/${id}/toggle`)
      .then((response) => {
        toast.success(response.data.message);
        setFavorites(
          favorites.map((fav) =>
            fav._id === id ? { ...fav, watched: !fav.watched } : fav
          )
        );
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Favorite Movies
      </h1>

      <FavoritesFilter selectedFilter={filter} onChange={setFilter} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFavorites.length ? (
          filteredFavorites.map((fav) => (
            <FavoriteMovieCard
              key={fav._id}
              favorite={fav}
              onDeleteFavorite={handleDeletFavorite}
              onToggleWatch={handleToggleMovieStatus}
            />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full py-32">
            <p className="text-gray-800 text-3xl font-medium">
              No Favorite movies yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
