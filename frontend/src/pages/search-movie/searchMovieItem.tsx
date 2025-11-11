import type { IMovie } from "../../types";
import fallbackImage from "../../assets/image-not-found.png";
import { getMovieYear } from "../../utils/getMovieYear";

interface SearchedMovieItemProps {
  movie: IMovie;
}

export const SearchedMovieItem: React.FC<SearchedMovieItemProps> = ({
  movie,
}) => {
  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : fallbackImage
        }
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-gray-500">
          {getMovieYear(movie)}
        </p>
      </div>
    </div>
  );
};
