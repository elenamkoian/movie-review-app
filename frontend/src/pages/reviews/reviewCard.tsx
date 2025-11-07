import { useForm } from "react-hook-form";
import type { IReview } from "../../types";
import { useState } from "react";

interface ReviewCardProps {
  review: IReview;
  onDeleteReview: (id: number) => void;
  onEditReview: (data: { description: string }, id: number) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onDeleteReview,
  onEditReview,
}) => {
  const { register, handleSubmit } = useForm<{ description: string }>();
  const [isEditMode, setEditMode] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02]">
      <div className="flex flex-col sm:flex-row">
        {/* 🎬 Movie Poster */}
        {review.movie?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${review.movie.poster_path}`}
            alt={review.movie.title}
            className="w-full h-full sm:w-1/3 object-cover sm:h-auto"
          />
        )}

        {/* 📝 Review Content */}
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{review.movie?.title}</h3>
              {review.edited && (
                <p className="italic text-sm text-gray-500">edited</p>
              )}
            </div>

            {isEditMode ? (
              <form
                onSubmit={handleSubmit((data) => {
                  onEditReview(data, review._id);
                  setEditMode(false);
                })}
              >
                <div className="flex flex-col gap-8">
                  <textarea
                    autoFocus
                    className="p-2 mb-2 border rounded w-full"
                    defaultValue={review.description}
                    {...register("description")}
                  />
                  <div className="flex gap-2 items-end">
                    <button
                      type="submit"
                      className="cursor-pointer flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="cursor-pointer flex-1 px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <p className="text-gray-700">
                {review.description}
              </p>
            )}
          </div>

          {!isEditMode && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="cursor-pointer flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteReview(review._id)}
                className="cursor-pointer flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
