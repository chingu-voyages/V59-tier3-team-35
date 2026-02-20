import { create } from "zustand";
import type { Role } from "../types/Role";

interface UserActions {
  setRole: (role: Role) => void;
}

type UserState = {
  role: Role | null;
  actions: UserActions;
};

const useUserStore = create<UserState>((set) => ({
  role: (localStorage.getItem("role") as Role) || null,
  actions: {
    setRole: (role: Role) => set({ role }),
  },
}));

export const useRole = () => useUserStore((state) => state.role);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
