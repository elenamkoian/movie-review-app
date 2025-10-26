import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login"
import { HomePage } from "./pages/home/home";

//make the default path login, or navigate to sign up if user does not exist
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/home", element: <HomePage />
  }
])