import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../lib/api";
import { Navbar } from "../layout/navbar";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("auth/user")
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="w-full h-full">
        <Outlet context={{ profile }} />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Footer */}
      <footer className="flex justify-center bg-gray-800 text-gray-300 py-6 mt-auto">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} My Review App.
        </p>
      </footer>
    </div>
  );
};
