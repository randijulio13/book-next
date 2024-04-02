import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (newAccessToken: string) => {
        set({ accessToken: newAccessToken });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
