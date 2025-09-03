import { makeAutoObservable, observable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePersistable } from 'mobx-persist-store';

import { Task } from './types';

class MobxTaskStore {
  tasks: Task[] = [];

  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'my-todo-storage',
      storage: AsyncStorage,
      properties: ['filter', 'tasks'],
    });
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(id: string, data: Partial<Task>) {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...data };
    }
  }

  getTaskById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  toggleTask(id: string) {
    runInAction(() => {
      const task = this.tasks.find((t) => t.id === id);

      if (task) {
        task.completed = !task.completed;
      }
    });
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  getFilteredTasks() {
    switch (this.filter) {
      case 'completed':
        return this.tasks.filter((t) => t.completed);
      case 'active':
        return this.tasks.filter((t) => !t.completed);
      default:
        return this.tasks;
    }
  }
}

export const mobxStore = new MobxTaskStore();
