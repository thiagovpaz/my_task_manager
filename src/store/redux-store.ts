import {
  createSlice,
  configureStore,
  PayloadAction,
  createSelector,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'redux:my-todo-storage',
  storage: AsyncStorage,
  whitelist: ['task'],
};

import { Task } from './types';

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}

const initialState: TaskState = {
  filter: 'all',
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);

      if (task) task.completed = !task.completed;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Partial<Task>>) => {
      const index = state.tasks.findIndex(
        (t) => t.id === String(action.payload.id),
      );

      if (index !== -1)
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
    },
    setFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      state.filter = action.payload;
    },
    getFilteredTasks: () => {},
  },
});

const rootReducer = combineReducers({
  task: taskSlice.reducer,
});

const selectTasks = (state: { task: { tasks: Task[]; filter: string } }) =>
  state.task.tasks;
const selectFilter = (state: { task: { tasks: Task[]; filter: string } }) =>
  state.task.filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    if (filter === 'all') return tasks;
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  },
);

export const {
  addTask,
  toggleTask,
  removeTask,
  updateTask,
  setFilter,
  getFilteredTasks,
} = taskSlice.actions;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //@ts-ignore
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const reduxStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
