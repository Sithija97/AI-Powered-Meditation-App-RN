import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Users,
  Vehicles,
  CreateUsers,
  CreateVehicles,
} from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PrivateRoute from "./components/privateRoute";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/vehicles" element={<Vehicles />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/createUser" element={<CreateUsers />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/createVehicle" element={<CreateVehicles />} />
      </Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
