import { useTaskStore as useZustandStore } from './zustand-store';
import { mobxStore } from './mobx-store';
import {
  useAppDispatch,
  useSelector,
  addTask,
  toggleTask,
  removeTask,
  updateTask,
  setFilter,
  selectFilteredTasks,
} from './redux-store';
import { useContextTaskStore } from './context-store';
import { Task } from './types';

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

  if (STORE_TYPE === 'redux') {
    const dispatch = useAppDispatch();

    const tasks = useSelector((state) => state.task.tasks);
    const filter = useSelector((state: any) => state.task.filter);
    const selectedFilteredTasks = useSelector(selectFilteredTasks);

    return {
      tasks,
      filter,
      addTask: (task: Task) => dispatch(addTask(task)),
      toggleTask: (id: string) => dispatch(toggleTask(id)),
      removeTask: (id: string) => dispatch(removeTask(id)),
      updateTask: (task: Partial<Task>) => dispatch(updateTask(task)),
      setFilter: (filterValue: 'all' | 'active' | 'completed') =>
        dispatch(setFilter(filterValue)),
      getTaskById: (id: string) => tasks.find((t: any) => t.id === id),
      getFilteredTasks: () => selectedFilteredTasks,
    };
  }

  if (STORE_TYPE === 'context') {
    return useContextTaskStore();
  }

  throw new Error('Store type inválido. Use zustand ou mobx.');
}
