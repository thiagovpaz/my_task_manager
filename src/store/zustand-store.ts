import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Task } from './types';

export type TaskState = {
  filter: 'all' | 'active' | 'completed';
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, task: Task) => void;
  getTaskById: (id: string) => Task | undefined;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  getFilteredTasks: () => Task[];
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      filter: 'all',
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      toggleTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (id: string, updates: Partial<Task>) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
          ),
        })),
      getTaskById: (id) => get().tasks.find((task) => task.id === id),
      setFilter: (filter) => set({ filter }),
      getFilteredTasks: () => {
        const { tasks, filter } = get();

        switch (filter) {
          case 'all':
            return tasks.filter((task) => !task.completed || task.completed);
          case 'active':
            return tasks.filter((task) => !task.completed);
          case 'completed':
            return tasks.filter((task) => task.completed);
          default:
            return tasks;
        }
      },
    }),
    {
      name: 'my-todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
