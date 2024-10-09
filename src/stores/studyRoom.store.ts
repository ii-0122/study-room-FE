import { ServerToClientPlanner } from '@/models/studyRoomTodos.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StudyRoomState {
  selectedTodo: ServerToClientPlanner | null;
  todos: ServerToClientPlanner[];
  setSelectedTodo: (todo: ServerToClientPlanner) => void;
  setTodos: (todos: ServerToClientPlanner[]) => void;
  addTodos: (newTodo: ServerToClientPlanner) => void;
  updateTodos: (updateTodo: ServerToClientPlanner) => void;
  toggleTodoComplete: (todoId: string) => void;
}

const useStudyRoomStore = create<StudyRoomState>()(
  devtools(
    (set) => ({
      selectedTodo: null,
      todos: [],
      setSelectedTodo: (todo: ServerToClientPlanner) =>
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
    }),
    { name: 'StudyRoom Store' }
  )
);

export default useStudyRoomStore;
