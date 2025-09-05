import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from './types';

type Filter = 'all' | 'active' | 'completed';

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'HYDRATE'; payload: TaskState };

interface TaskState {
  tasks: Task[];
  filter: Filter;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const TaskContext = createContext<ReturnType<typeof createStore> | null>(null);

function createStore(state: TaskState, dispatch: React.Dispatch<TaskAction>) {
  return {
    tasks: state.tasks,
    filter: state.filter,
    addTask: (task: Task) => dispatch({ type: 'ADD_TASK', payload: task }),
    toggleTask: (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    removeTask: (id: string) => dispatch({ type: 'REMOVE_TASK', payload: id }),
    updateTask: (task: Task) =>
      dispatch({ type: 'UPDATE_TASK', payload: task }),
    setFilter: (filter: Filter) =>
      dispatch({ type: 'SET_FILTER', payload: filter }),
    getTaskById: (id: string) => state.tasks.find((t) => t.id === id),
    getFilteredTasks: () => {
      if (state.filter === 'all') return state.tasks;
      if (state.filter === 'active')
        return state.tasks.filter((t) => !t.completed);
      if (state.filter === 'completed')
        return state.tasks.filter((t) => t.completed);
      return state.tasks;
    },
  };
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const store = createStore(state, dispatch);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('context:my-todo-storage');

        if (raw) {
          const data = JSON.parse(raw);

          dispatch({ type: 'HYDRATE', payload: data });
        }
      } catch (e) {
        console.error('Erro ao carregar AsyncStorage', e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(
          'context:my-todo-storage',
          JSON.stringify(state),
        );
      } catch (e) {
        console.error('Erro ao salvar AsyncStorage', e);
      }
    };
    save();
  }, [state]);

  return <TaskContext.Provider value={store}>{children}</TaskContext.Provider>;
}

export function useContextTaskStore() {
  const ctx = useContext(TaskContext);
  if (!ctx)
    throw new Error(
      'useContextTaskStore deve ser usado dentro de <TaskProvider>',
    );
  return ctx;
}
