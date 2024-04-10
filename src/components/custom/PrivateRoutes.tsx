import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  let auth = { user: true };
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}
