import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserAuth } from 'src/types';

interface IUserStore {
  user: UserAuth | null;
  setUser: (user: UserAuth) => void;
  clearUser: () => void;
}

// User store
export const useUserStore = create<IUserStore>(
  // @ts-ignore
  devtools((set) => ({
    user: null,
    setUser: (user: UserAuth) => set({ user }),
    clearUser: () => set({ user: null }),
  }))
);
