import { makeAutoObservable, observable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePersistable } from 'mobx-persist-store';

import { Task } from './types';

class MobxTaskStore {
  state = {
    tasks: [] as Task[],
    filter: 'all' as 'all' | 'active' | 'completed',
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'persist:my-todo-storage',
      storage: AsyncStorage,
      properties: ['state'],
      debugMode: true,
    });
  }

  addTask(task: Task) {
    this.state.tasks.push(task);
  }

  updateTask(task: Partial<Task>) {
    const index = this.state.tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.state.tasks[index] = { ...this.state.tasks[index], ...task };
    }
  }

  getTaskById(id: string) {
    return this.state.tasks.find((t) => t.id === id);
  }

  removeTask(id: string) {
    this.state.tasks = this.state.tasks.filter((t) => t.id !== id);
  }

  toggleTask(id: string) {
    runInAction(() => {
      const task = this.state.tasks.find((t) => t.id === id);

      if (task) {
        task.completed = !task.completed;
      }
    });
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.state.filter = filter;
  }

  getFilteredTasks() {
    switch (this.state.filter) {
      case 'completed':
        return this.state.tasks.filter((t) => t.completed);
      case 'active':
        return this.state.tasks.filter((t) => !t.completed);
      default:
        return this.state.tasks;
    }
  }
}

export const mobxStore = new MobxTaskStore();
