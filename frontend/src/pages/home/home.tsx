import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white"> */}
        {/* <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md"> */}
          <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white border-b border-gray-700 shadow-md">


        <h1 className="text-2xl font-bold">MovieMate</h1>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-6">
          <li><Link to="/movies" className="hover:underline">Movies</Link></li>
          <li><Link to="/my-reviews" className="hover:underline">My Reviews</Link></li>
          <li><Link to="/" className="hover:underline">Login</Link></li>
          <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
        </ul>
      </nav>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover. Rate. Review.</h1>
        <p className="text-lg text-gray-300 mb-8">
          Join the community of movie lovers sharing honest opinions.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
            Browse Movies
          </button>
          <button className="bg-gray-800 border border-white px-6 py-3 rounded-xl hover:bg-gray-700 transition">
            Write a Review
          </button>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Movies</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Map your movie data here */}
          {[1, 2, 3, 4].map((m) => (
            <div key={m} className="bg-white shadow rounded-xl overflow-hidden">
              <img src="/movie-placeholder.jpg" alt="Movie Poster" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Movie Title</h3>
                <p className="text-yellow-500">⭐ 8.5 / 10</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
