import { ServerToClientPlanner } from '@/models/studyRoomTodos.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StudyRoomState {
  selectedTodo: ServerToClientPlanner | null;
  todos: ServerToClientPlanner[];
  settingModal: boolean;

  setSelectedTodo: (todo: ServerToClientPlanner | null) => void;
  setTodos: (todos: ServerToClientPlanner[]) => void;
  addTodos: (newTodo: ServerToClientPlanner) => void;
  updateTodos: (updateTodo: ServerToClientPlanner) => void;
  toggleTodoComplete: (todoId: string) => void;
  toggleSettingModal: () => void;
}

const useStudyRoomStore = create<StudyRoomState>()(
  devtools(
    (set) => ({
      selectedTodo: null,
      todos: [],
      settingModal: false,

      setSelectedTodo: (todo: ServerToClientPlanner | null) =>
        set({ selectedTodo: todo }),
      setTodos: (todos: ServerToClientPlanner[]) => set({ todos: todos }),
      addTodos: (newTodo: ServerToClientPlanner) =>
        set((state) => ({
          todos: [...state.todos, newTodo],
        })),
      updateTodos: (updateTodo: ServerToClientPlanner) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === updateTodo._id ? updateTodo : todo
          ),
        })),
      toggleTodoComplete: (todoId: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === todoId
              ? { ...todo, isComplete: !todo.isComplete }
              : todo
          ),
        })),
      toggleSettingModal: () =>
        set((state) => ({ settingModal: !state.settingModal })),
    }),

    { name: 'StudyRoom Store' }
  )
);

export default useStudyRoomStore;
