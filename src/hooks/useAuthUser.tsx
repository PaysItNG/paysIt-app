import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthType = {
  userData: unknown;
  token?: {
    access?: string | null;
    refresh?: string | null;
  };
  setAuthUser: (authData: {
    data?: { [key: string]: unknown };
    token?: {
      access: string | null;
      refresh: string | null;
    }; // Replace with the actual structure of `token`
    logged_in?: boolean | null;
    message?: string | null;
  }) => void;
  removeAuthUser: () => void;
  [key: string]: unknown;
};

// Define the type for the persist middleware
// type AuthState = AuthType & PersistOptions<AuthType>;

const useAuthUser = create<AuthType>()(
  persist<AuthType>(
    (set) => ({
      userData: null,
      token: {},
      setAuthUser: (
        authData = {
          data: {},
        }
      ) => set({ userData: authData.data, token: authData.token }),
      removeAuthUser: () => {
        localStorage.removeItem("paysit-auth-session");
        set({ userData: null, token: {} });
      },
    }),
    {
      name: "paysit-auth-session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthUser;
