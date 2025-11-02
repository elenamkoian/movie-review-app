import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { HomePage } from "./pages/home/home";
import { Layout } from "./pages/layout/layout";
import { FavoritesPage } from "./pages/favorites/favorites";
import { ProfilePage } from "./pages/profile/profile";
import { SearchPage } from "./pages/search/search";
import { ReviewsPage } from "./pages/reviews/page";
import { MoviesPage } from "./pages/movies/movies";
import { MovieView } from "./pages/movies/movieView";

//make the default path login, or navigate to sign up if user does not exist
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/movies/:category", element: <MoviesPage /> },
      { path: "/movie/:id", element: <MovieView /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "reviews", element: <ReviewsPage /> },
    ],
  },
]);
