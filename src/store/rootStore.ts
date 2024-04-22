import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      login: (user: any) => set({ user, authenticated: true }),
      logout: () => set({ user: null, authenticated: false }),
    }),
    {
      name: "user-data", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
