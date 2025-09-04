import { useTaskStore as useZustandStore } from './zustand-store';
import { mobxStore } from './mobx-store';

const STORE_TYPE = process.env.EXPO_PUBLIC_STORE_TYPE || 'zustand';

export function useTaskStore() {
  if (STORE_TYPE === 'zustand') {
    return useZustandStore();
  }

  if (STORE_TYPE === 'mobx') {
    return {
      filter: mobxStore.state.filter,
      tasks: mobxStore.state.tasks,
      addTask: mobxStore.addTask.bind(mobxStore),
      toggleTask: mobxStore.toggleTask.bind(mobxStore),
      removeTask: mobxStore.removeTask.bind(mobxStore),
      updateTask: mobxStore.updateTask.bind(mobxStore),
      getTaskById: mobxStore.getTaskById.bind(mobxStore),
      setFilter: mobxStore.setFilter.bind(mobxStore),
      getFilteredTasks: () => mobxStore.getFilteredTasks(),
    };
  }

  throw new Error('Store type inválido. Use zustand ou mobx.');
}
