import { ChatRes } from '@/models/chat.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface chatRoomState {
  chatArray: ChatRes[];
  setChatArray: (chatData: ChatRes) => void;
}

const useChatStore = create<chatRoomState>()(
  devtools(
    (set) => ({
      chatArray: [],
      setChatArray: (chatData: ChatRes) =>
        set((state) => ({
          chatArray: [...state.chatArray, chatData],
        })),
    }),
    { name: 'StudyRoom Store' }
  )
);

export default useChatStore;
