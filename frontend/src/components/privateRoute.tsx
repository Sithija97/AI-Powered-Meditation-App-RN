import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "../store/store";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
