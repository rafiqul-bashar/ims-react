import { useAuthStore } from "@/store/authStore";

import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const { AUTHENTICATED } = useAuthStore((state) => state);

  return AUTHENTICATED ? <Outlet /> : <Navigate to="/login" />;
}
