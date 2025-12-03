import { useForm } from "react-hook-form";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";

export const ResetLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ password: string; newLogin: string }>();

  const handleResetLogin = (data: { password: string; newLogin: string }) => {
    Axios.patch("/auth/user/resetLogin", data)
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
      <form onSubmit={handleSubmit(handleResetLogin)} className="space-y-4">
        <h2 className="text-md font-semibold text-gray-700">Reset Login</h2>

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          {...register("password", {
            required: "Please fill in your password",
          })}
          type="password"
          placeholder="Current password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        {errors.newLogin && (
          <p className="text-red-500">{errors.newLogin.message}</p>
        )}
        <input
          {...register("newLogin", { required: "Please fill in your login" })}
          type="text"
          placeholder="New login"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button className="bg-gray-800 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-gray-700 transition shadow-md hover:shadow-lg hover:scale-105">
          Reset Login
        </button>
      </form>
    </div>
  );
};
