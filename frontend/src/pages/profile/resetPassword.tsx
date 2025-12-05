import { useForm } from "react-hook-form";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ oldPassword: string; newPassword: string }>();

  const handleResetPassword = (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    Axios.patch("/auth/user/resetPassword", data)
      .then((response) => {
        toast.success(response.data.message);
        reset()
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
        <h2 className="text-md font-semibold text-gray-700">Reset Password</h2>

        {errors.oldPassword && (
          <p className="text-red-500">{errors.oldPassword.message}</p>
        )}
        <input
          {...register("oldPassword", {
            required: "Please fill in your password",
          })}
          type="password"
          placeholder="Current password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
        <input
          {...register("newPassword", {
            required: "Please fill in your login",
          })}
          type="text"
          placeholder="New password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button className="bg-gray-800 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-gray-700 transition shadow-md">
          Reset Password
        </button>
      </form>
    </div>
  );
};
