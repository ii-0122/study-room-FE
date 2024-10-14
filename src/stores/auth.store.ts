import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  nickname: string;
  imageUrl?: string;
  introduction?: string;
}
interface AuthState {
  accessToken: string | null;
  user: User | null;
  setUser: (user: User) => void;
  setAuthData: (accessToken: string, user: User | null) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,

  setUser: (user) => {
    set({ user });

    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 1 });
    } else {
      Cookies.remove('user');
    }
  },

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
