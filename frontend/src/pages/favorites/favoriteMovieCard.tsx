import type { IFavoriteMovie } from "../../types";
import { format } from "date-fns";

interface FavoriteMovieCardProps {
  favorite: IFavoriteMovie;
  onDeleteFavorite: (id: string) => void;
  onToggleWatch: (id: string) => void;
}

export const FavoriteMovieCard: React.FC<FavoriteMovieCardProps> = ({
  favorite,
  onDeleteFavorite,
  onToggleWatch,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-2x hover:shadow-xl transition-transform transform hover:scale-[1.02]">
      <img
        src={`https://image.tmdb.org/t/p/w300${favorite.movie.poster_path}`}
        alt={favorite.movie.title}
        className="w-full md:w-1/3 h-64 object-cover"
      />

      <div className="flex-1 p-4 flex flex-col gap-2 justify-around">
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            {favorite.movie.title}
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            Added to favorites: {format(new Date(favorite.date), "MMM d, yyyy")}
          </p>
          <p
            className={`text-sm font-medium ${
              favorite.watched ? "text-green-600" : "text-red-500"
            }`}
          >
            {favorite.watched ? "Watched ✅" : "Not watched 👀"}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
            onClick={() => onToggleWatch(favorite._id)}
          >
            {favorite.watched ? "Mark Unwatched" : "Mark Watched"}
          </button>
          <button
            onClick={() => onDeleteFavorite(favorite._id)}
            className="cursor-pointer px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
