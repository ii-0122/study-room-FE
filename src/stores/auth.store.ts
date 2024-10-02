import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  accessToken: string | null;
  user: any; // 사용자 타입을 정의해 주세요
  setAuthData: (token: string, user: any) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  user: null,
  setAuthData: (token, user) => {
    set({ accessToken: token, user });
    if (token) {
      Cookies.set('accessToken', token, { expires: 1 });
    } else {
      Cookies.remove('accessToken');
    }
  },
  clearAuthData: () => {
    set({ accessToken: null, user: null });
    Cookies.remove('accessToken');
  },
}));
