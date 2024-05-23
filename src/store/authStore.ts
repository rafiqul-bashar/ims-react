import { AdminUser } from "@/utils/constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      AUTHENTICATED: false,
      SELECTED_STORE: null,
      USERDATA: null,
      SAVE_USER_TO_STORE: (user: AdminUser) =>
        set({ USERDATA: user, AUTHENTICATED: true }),
      LOGOUT_USER: () => set({ USERDATA: null, AUTHENTICATED: false }),
      SELECT_STORE: (id: number) => set({ SELECTED_STORE: id }),
    }),
    {
      name: "user-data", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
