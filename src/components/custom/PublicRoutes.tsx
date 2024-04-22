import { useUserStore } from "@/store/rootStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const authenticated = useUserStore((state) => state.authenticated);
  return authenticated ? <Navigate to="/" /> : <Outlet />;
}
