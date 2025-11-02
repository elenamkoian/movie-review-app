import type { IMovie } from "../../types";

interface UpcomingMoviesProps {
  movies: IMovie[];
  sectionTitle?: string;
}

export const ScrollableMovieSection: React.FC<UpcomingMoviesProps> = ({
  movies,
  sectionTitle
}) => {
  return (
    <section className="p-14 text-white relative bg-linear-to-t via-gray-900 from-gray-900 to-transparent">
      <h2 className="text-3xl font-bold m-16 text-center">
        🎬 {sectionTitle}
      </h2>

      <div className="flex gap-6 py-3 overflow-x-auto scrollbar-hide pb-4 snap-mandatory scroll-smooth max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-black/30 to-transparent">
          <img
            src="../src/assets/bg1.jpg"
            className="w-full h-full object-center opacity-30"
          />
        </div>
        {movies.map((m) => (
          <div
            key={m.id}
            className="relative shrink-0 w-48 sm:w-56 md:w-60 cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.title}
              className="w-full h-[400px] object-cover rounded-2xl shadow-md"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center rounded-2xl">
              <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                See More...
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
