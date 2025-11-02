import type { IMovie } from "../../types";
import { MovieCard } from "./movieCard";

interface MovieSectionProps {
  movies: IMovie[];
  sectionTitle?: string;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  movies,
  sectionTitle,
}) => {
  return (
    <section className="py-16 px-8 bg-linear-to-b from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        🎥 {sectionTitle}
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
};
