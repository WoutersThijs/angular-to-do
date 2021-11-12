import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    let tasks: Task[] = [];

    let task1: Task = {
      id: 1,
      name: "Angular Project",
      description: 'To-do app maken. Zie canvas.',
      deadline: new Date(Date.now()),
      complete: false
    };

    let task2: Task = {
      id: 2,
      name: "APT Project",
      description: 'Microservices event applicatie',
      deadline: new Date(Date.now()),
      complete: false
    };

    tasks.push(task1);
    tasks.push(task2);

    return tasks;
  }
}
