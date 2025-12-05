import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Axios } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import type { ILoginUser } from "../../types";
import { toast } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<ILoginUser> = async (data: ILoginUser) => {
    Axios.post("/auth/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data.message || "Login failed");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
            className="w-full cursor-pointer bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-800 font-semibold hover:underline transform hover:shadow-lg hover:scale-105"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
