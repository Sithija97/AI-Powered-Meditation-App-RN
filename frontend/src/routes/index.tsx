import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Users, Vehicles, Hire, Layout } from "../pages";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/";
export const HOME = "/home";
export const USERS = "users";
export const HIRE = "hire";
export const VEHICLES = "vehicles";

export const router = createBrowserRouter([
  { path: ROOT, element: <Login /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: HOME,
        element: <Home />,
      },
      {
        path: USERS,
        element: <Users />,
      },
      {
        path: HIRE,
        element: <Hire />,
      },
      {
        path: VEHICLES,
        element: <Vehicles />,
      },
    ],
  },
]);
