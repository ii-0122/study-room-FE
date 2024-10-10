import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    nickname: string;
    imageUrl?: string;
    introduction?: string;
  } | null;
  setAuthData: (
    accessToken: string,
    user: {
      id: string;
      nickname: string;
      imageUrl?: string;
      introduction?: string;
    } | null
  ) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,

  setAuthData: (accessToken, user) => {
    set(() => ({ accessToken, user }));
    if (accessToken && user) {
      Cookies.set('accessToken', accessToken, { expires: 1 });
      Cookies.set('user', JSON.stringify(user), { expires: 1 });
    } else {
      Cookies.remove('accessToken');
      Cookies.remove('user');
    }
  },

  clearAuthData: () => {
    set({ accessToken: null, user: null });
    Cookies.remove('accessToken');
    Cookies.remove('user');
  },
}));
