import type { IMovie } from "../../types";
interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center rounded-2xl">
        <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          See More...
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600 text-sm">{new Date(movie.release_date).getFullYear()}</p>
          <div className="flex gap-1 bg-gray-100 px-2 py-1 rounded-lg text-sm">
            <span className="text-blue-500 font-bold">★</span>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};
