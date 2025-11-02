import { RoundedArrowDownIcon } from "../../components/roundedArrowDown";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen mb-10 flex flex-col items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-black/30 to-transparent">
        <img
          src="../src/assets/bg2.jpg"
          className="w-full h-full object-center opacity-40"
        />
      </div>

      <div className="relative">
        <h1 className="text-3xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg transform transition-transform duration-500">
          Discover. Rate. Review.
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto transform transition-transform duration-500">
          Join the community of movie lovers sharing honest opinions
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/search">
            <button className="bg-red-600 cursor-pointer text-white border border-white px-6 py-3 rounded-xl transform hover:scale-110 hover:bg-red-800 transition duration-400">
              Browse Movies
            </button>
          </Link>
          <Link to="/reviews">
            <button className="bg-transparent border cursor-pointer border-white px-6 py-3 rounded-xl hover:bg-white hover:text-gray-900 hover:scale-110 duration-400 transition">
              Browse Reviews
            </button>
          </Link>

          <div className="animate-bounce absolute top-90 left-1/2 transform -translate-x-1/2 cursor-pointer">
            <RoundedArrowDownIcon onClick={scrollDown} />
          </div>
        </div>
      </div>
    </section>
  );
};
