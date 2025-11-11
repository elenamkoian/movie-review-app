import type { IMovie } from "../types.ts";

export const getMovieYear  = (movie: IMovie): number | string => {
  return movie.release_date ? Number(movie.release_date.split("-")[0]) : ""
}
