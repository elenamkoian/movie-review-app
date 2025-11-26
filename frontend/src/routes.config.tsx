import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { HomePage } from "./pages/home/home";
import { Layout } from "./pages/layout/layout";
import { FavoritesPage } from "./pages/favorites/favorites";
import { ProfilePage } from "./pages/profile/profile";
import { SearchMoviePage } from "./pages/search-movie/searchMovie";
import { MoviesPage } from "./pages/movies/movies";
import { MovieView } from "./pages/movies/movieView";
import { ReviewsPage } from "./pages/reviews/reviewPage";
import { SearchUserPage } from "./pages/search-user/searchUser";
import { SearchedUserPage } from "./pages/search-user/serchedUserPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "movies/:category", element: <MoviesPage /> },
      { path: "movie/:id", element: <MovieView /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "saves", element: <FavoritesPage /> },
      { path: "search-movie", element: <SearchMoviePage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "search-user", element: <SearchUserPage /> },
      { path: "searched-user/:id", element: <SearchedUserPage /> },
    ],
  },
]);
