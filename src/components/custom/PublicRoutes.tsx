import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const authenticated = useAuthStore((state) => state.AUTHENTICATED);
  return authenticated ? <Navigate to="/" /> : <Outlet />;
}
