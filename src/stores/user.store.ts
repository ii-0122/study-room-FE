import { create } from 'zustand';
import { getCookie } from '@/utils/cookie';

interface UserState {
  user: { id: string; nickname: string; imageUrl: string } | null;
  setUserFromCookie: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUserFromCookie: () => {
    const userInfo = getCookie('user_info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      set({ user });
    }
  },

  clearUser: () => {
    document.cookie = 'user_info=; Max-Age=-99999999;';
    set({ user: null });
  },
}));
