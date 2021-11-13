import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    let tasks: Task[] = [];

    for(let i = 15; i > 0; i--){
      let task: Task = {
        id: 1,
        name: "Angular Project " + i.toString(),
        description: 'To-do app maken. Zie canvas.',
        deadline: new Date(Date.now()),
        complete: false
      };

      tasks.push(task);
    }

    return tasks;
  }
}
