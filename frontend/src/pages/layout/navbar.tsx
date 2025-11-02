import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { Axios } from "../../lib/api";

export const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // may add modal for logout confirmation
  const handlelogout = () => {
    Axios.post("/auth/logout").catch((err) => {
      console.error("Error during logout:", err);
    });
    localStorage.removeItem("token");
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const categories = [
    { label: "Popular", to: "/" },
    { label: "Upcoming", to: "/movies/upcoming" },
    { label: "Action", to: "/movies/action" },
    { label: "Comedy", to: "/movies/comedy" },
    { label: "Romance", to: "/movies/romance" },
    { label: "Animation", to: "/movies/animation" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md fixed top-0 w-full z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center space-x-4 relative">
        {/* Movies with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-1"
          >
            Movies
            <span
              className={`transition-transform pt-1 ${
                isDropdownOpen ? "" : "rotate-180"
              }`}
            >
              ^
            </span>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute -mx-12 mt-3 w-44 bg-gray-800 rounded-b-md shadow-lg transition-all duration-200 ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <ul className="flex flex-col py-2">
              {categories.map((cat) => (
                <li key={cat.to}>
                  <NavLink
                    to={cat.to}
                    className="block px-4 py-2 text-sm text-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)} // close after selecting
                  >
                    {cat.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NavLink to="/favorites" className={linkClasses}>
          My Favorites
        </NavLink>
        <NavLink to="/reviews" className={linkClasses}>
          My Reviews
        </NavLink>
        <NavLink to="/search" className={linkClasses}>
          Search
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          Profile
        </NavLink>
        <NavLink to="/login" className={linkClasses} onClick={handlelogout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
