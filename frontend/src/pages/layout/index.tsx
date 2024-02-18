import { Navigate, Outlet } from "react-router-dom";
import { RootState, useAppSelector } from "../../store/store";

type IProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: IProps) => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const Layout = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};
