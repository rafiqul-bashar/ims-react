import { useUserStore } from "@/store/rootStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const authenticated = useUserStore((state) => state.authenticated);
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}
