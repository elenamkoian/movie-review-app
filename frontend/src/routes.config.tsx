import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { HomePage } from "./pages/home/home";
import { Layout } from "./pages/layout/layout";
import { WatchlistPage } from "./pages/watchlist/watchlist";
import { ProfilePage } from "./pages/profile/profile";
import { SearchPage } from "./pages/search/search";
import { ReviewsPage } from "./pages/reviews/page";

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
      { path: "/profile", element: <ProfilePage /> },
      { path: "/watchlist", element: <WatchlistPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/reviews", element: <ReviewsPage /> },
    ],
  },
]);
