import { useForm } from "react-hook-form";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AddReviewFormProps {
  onCancel: () => void;
  movieId: number | undefined;
  title: string | undefined;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({
  title,
  onCancel,
  movieId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ description: string }>();

  const navigate = useNavigate();

  const handleSubmitForm = (data: { description: string }) => {
    Axios.post(`/movies/${movieId}/review`, data)
      .then(() => {
        toast.success("Your review has been submitted!");
        navigate("/reviews")
      })
      .catch(() => toast.error("Failed to submit review"));
    reset();
  };

  return (
    <div className="flex justify-center pb-20">
      <div className="bg-white max-w-5xl w-full md:w-3/4 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row transition-all duration-300 ease-in-out">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">
            Write your Review about "{title}"
          </h3>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <textarea
              placeholder="Your Review"
              {...register("description", {
                required: "Please provide your review before submit",
              })}
              className="border border-gray-300 rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="cursor-pointer px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition hover:scale-105 hover:shadow-lg transform duration-200 ease-in-out"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition hover:scale-105 hover:shadow-lg transform duration-200 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
