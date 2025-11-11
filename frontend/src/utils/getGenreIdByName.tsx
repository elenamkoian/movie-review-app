export const getGenreIdByName = (name: string): number => {
  const genres: Record<string, number> = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Drama: 18,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    "Science Fiction": 878,
    Thriller: 53,
    Romance: 10749,
  };

  return genres[name] || 0;
};