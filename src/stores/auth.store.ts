import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    nickname: string;
    imageUrl?: string;
    introduction?: string;
    dDay?: string;
  } | null;
  setAuthData: (
    accessToken: string,
    user: {
      id: string;
      nickname: string;
      imageUrl?: string;
      introduction?: string;
      dDay?: string;
    } | null
  ) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  user: null,
  setAuthData: (accessToken, user) => {
    set(() => ({ accessToken, user }));
    if (accessToken) {
      Cookies.set('accessToken', accessToken, { expires: 0.0104 });
    } else {
      Cookies.remove('accessToken');
    }
  },

  clearAuthData: () => {
    set({ accessToken: null, user: null });
    Cookies.remove('accessToken');
  },
}));
