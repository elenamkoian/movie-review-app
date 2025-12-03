import type { IReview } from "../../types";

interface AllReviewsProps {
  onCancel: () => void;
  allReviews: IReview[];
}

export const AllReviews: React.FC<AllReviewsProps> = ({
  onCancel,
  allReviews,
}) => {
  return (
    <div className="flex justify-center pb-20">
      <div className="flex flex-col gap-3 max-w-5xl w-full p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 ">
          All Reviews{" "}
          {allReviews.length ? 'about "' + allReviews[0].movie.title + '"' : ""}
        </h2>

        {allReviews.length ? (
          allReviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-100 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.userId?.avatar ? `${import.meta.env.VITE_API_URL}/uploads/${review.userId?.avatar}` : "/src/assets/avatar.png"}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.userId?.name} {review.userId?.surname}
                  </p>
                </div>
              </div>

              <p className="text-gray-700">{review.description}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center text-gray-500 text-xl">
            <p>No reviews Yet</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 hover:scale-105 hover:shadow-lg transition transform duration-200 ease-in-out"
            onClick={onCancel}
          >
            Hide Reviews
          </button>

        </div>
      </div>
    </div>
  );
};
