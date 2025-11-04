import React from "react";

interface FavoritesFilterProps {
  selectedFilter: "all" | "watched" | "unwatched";
  onChange: (filter: "all" | "watched" | "unwatched") => void;
}

export const FavoritesFilter: React.FC<FavoritesFilterProps> = ({
  selectedFilter,
  onChange,
}) => {
  const filters = ["all", "watched", "unwatched"] as const;

  return (
    <div className="flex gap-4 mb-6 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`cursor-pointer px-4 py-2 rounded-lg font-medium capitalize transition-colors duration-200
            ${
              selectedFilter === filter
                ? "bg-gray-700 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
