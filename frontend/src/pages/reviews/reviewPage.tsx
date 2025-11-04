import { useEffect, useState } from "react";
import type { IReview } from "../../types";
import { Axios } from "../../lib/api";
import { ReviewCard } from "./reviewCard";
import { toast } from "react-toastify";

export const ReviewsPage = () => {
  const [reviews, setReviews] = useState<IReview[]>();

  useEffect(() => {
    Axios.get("/movies/all/reviews")
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      Axios.delete(`/movies/review/${reviewId}`);
      toast.success("Review has been deleted!");
      setReviews(reviews?.filter((rev) => rev._id != reviewId));
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const handleEditReview = (
    data: { description: string },
    reviedwId: number
  ) => {
    Axios.patch(`/movies/review/${reviedwId}/edit`, data) // use review._id
      .then(() => {
        toast.success("Review has been updated!");
        setReviews(reviews?.map(r => r._id === reviedwId ? { ...r, description: data.description, edited: true  } : r ))
      })
      .catch(() => toast.error("Failed to update the review"));
  };

  return (
    <div className="p-6 cursor-pointer">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews &&
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDeleteReview={handleDeleteReview}
              onEditReview={handleEditReview}
            />
          ))}
      </div>
    </div>
  );
};
