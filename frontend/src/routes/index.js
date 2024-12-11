import LoginPage from "../pages/LoginPage/LoginPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const routes = [
  {
    path: "/login",
    page: LoginPage,
  },
  {
    path: "/register",
    page: SigninPage,
  },
  {
    path: "/home",
    page: HomePage,
  },
  {
    path: "/profile",
    page: ProfilePage,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
