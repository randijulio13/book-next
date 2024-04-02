import swal from "@/libs/sweetalert";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
  checkAuthState: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: "",
      setAccessToken: (newAccessToken: string) => {
        set({ accessToken: newAccessToken });
      },
      checkAuthState: () => {
        if (!get().accessToken) {
          swal.fire({
            icon: "error",
            title: "Error",
            text: "You are unauthorized",
            confirmButtonText: "Close",
          });
          return false;
        }
        return true;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
