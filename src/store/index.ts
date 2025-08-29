import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export type TaskState = {
  tasks: Task[];
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
    }),
    {
      name: 'my-todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
