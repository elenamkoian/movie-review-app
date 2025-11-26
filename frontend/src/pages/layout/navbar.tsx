import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-6xl mx-auto px-6 py-4 flex gap-20 items-center">
        {/* Left Section - Logo */}
        <Link to="/">
          <p className="text-2xl font-semibold text-gray-200 cursor-pointer">MovieReviewApp</p>
        </Link>

        {/* Middle Section - Links */}
        <div className="flex items-center space-x-4">
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
              className={`absolute left-0 mt-2 -mx-12 w-44 bg-gray-800 rounded-b-md shadow-lg transition-all duration-200 ${
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
                      onClick={() => setDropdownOpen(false)}
                    >
                      {cat.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <NavLink to="/saves" className={linkClasses}>
            My Saves
          </NavLink>
          <NavLink to="/reviews" className={linkClasses}>
            My Reviews
          </NavLink>
          <NavLink to="/search-movie" className={linkClasses}>
            Search Movie
          </NavLink>
          <NavLink to="/search-user" className={linkClasses}>
            Search User
          </NavLink>
          <NavLink to="/profile" className={linkClasses}>
            My Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
