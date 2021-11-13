import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Task[]>("http://localhost:3000/tasks")));
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>("http://localhost:3000/tasks/" + id);
  }
}
