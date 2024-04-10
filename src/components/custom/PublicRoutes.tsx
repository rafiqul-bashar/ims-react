import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  let auth = { user: true };
  return auth.user && <Navigate to="/" />;
}
