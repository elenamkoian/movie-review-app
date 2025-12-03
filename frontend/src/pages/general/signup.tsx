import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { IUser } from "../../types";
import type { SubmitHandler } from "react-hook-form";
import { Axios } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();

  const handleSignup: SubmitHandler<IUser> = async (data: IUser) => {
    Axios.post("/auth/signup", data)
      .then((response) => {
        navigate("/login");
        reset()
        toast.success(response.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          SignUp
        </h1>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          <div>
            {errors.name && (
              <p className="text-red-700">{errors.name.message}</p>
            )}
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              {...register("name", { required: "Please enter your name" })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <div>
            {errors.surname && (
              <p className="text-red-700">{errors.surname.message}</p>
            )}
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Surname
            </label>
            <input
              {...register("surname", {
                required: "Please enter your surname",
              })}
              type="text"
              placeholder="Enter your surname"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <div>
            {errors.login && (
              <p className="text-red-700">{errors.login.message}</p>
            )}
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Login
            </label>
            <input
              {...register("login", { required: "Please enter your login" })}
              type="text"
              placeholder="Enter your login"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <div>
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition shadow-md hover:shadow-lg hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-800 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
