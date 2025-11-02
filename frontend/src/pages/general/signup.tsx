import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { IUser } from "../../types";
import type { SubmitHandler } from "react-hook-form";
import { Axios } from "../../lib/api";
import axios from "axios";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleSignup: SubmitHandler<IUser> = async (data: IUser) => {
    console.log(data);
    Axios.post("/auth/signup", data)
      .then((response) => {
        console.log(response)
        reset()
      }) // navigate("/login");
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const errorResp = err.response?.data;
          setError(errorResp.message || "Sign up failed");
        }
      });

    // try {
    //   const res = await axios.post("http://localhost:4005/auth/login", data);
    //   localStorage.setItem("token", res.data.token);
    //   navigate("/movies");
    // } catch (err) {
    //   setError(err.response?.data?.message || "Login failed");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          SignUp
        </h1>

        {error && <p className="text-red-700">{error}</p>}

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          {/* Name */}
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
              placeholder="Enter your login"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          {/* Surname */}
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
              placeholder="Enter your login"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          {/* Login */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
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
