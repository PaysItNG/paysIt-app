/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthUser = create(
  persist(
    (set) => ({
      userData: null,
      setAuthUser: (data = {}) => set({ userData: data }),
      removeAuthUser: () => set({ userData: null }),
    }),
    {
      name: "paysit-auth-session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthUser;
