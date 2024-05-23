import { useAuthStore } from "@/store/authStore";

import { Navigate } from "react-router-dom";

export default function CheckingForStore({ children }) {
  const { USERDATA } = useAuthStore((state) => state);
  if (USERDATA?.store?.id) {
    return children;
  } else {
    return <Navigate to="/manage-store" />;
  }
}
