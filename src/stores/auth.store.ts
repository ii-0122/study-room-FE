import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: { id: string; nickname: string; imageUrl?: string } | null;
  setAuthData: (
    token: string,
    user: { id: string; nickname: string; imageUrl?: string } | null
  ) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuthData: (token, user) => set({ accessToken: token, user }),
  clearAuthData: () => set({ user: null }),
}));
