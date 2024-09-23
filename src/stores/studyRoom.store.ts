import { GetTodosRes } from '@/models/studyRoomTodos.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StudyRoomState {
  selectedTodo: GetTodosRes | null;
  setSelectedTodo: (todo: GetTodosRes) => void;
}

const useStudyRoomStore = create<StudyRoomState>()(
  devtools(
    (set) => ({
      selectedTodo: null,
      setSelectedTodo: (todo: GetTodosRes) => set({ selectedTodo: todo }),
    }),
    { name: 'StudyRoom Store' }
  )
);

export default useStudyRoomStore;
