import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getTasksByList(listID: number): Observable<Task[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Task[]>("http://localhost:3000/tasks?list_id=" + listID)));
  }

  getTasksByID(taskID: number): Observable<Task> {
    return this.httpClient.get<Task>("http://localhost:3000/tasks/" + taskID);
  }

  postTask(task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Task>("http://localhost:3000/tasks", task, {headers: headers});
  }

  putTask(taskID: number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>("http://localhost:3000/tasks/" + taskID, task, {headers: headers});
  }

  completeTask(taskID: number, value: boolean): Observable<Task>{
    return this.httpClient.patch<Task>("http://localhost:3000/tasks/" + taskID, {complete: value});
  }

  deleteTask(taskID: number): Observable<Task> {
    return this.httpClient.delete<Task>("http://localhost:3000/tasks/" + taskID);
  }
}
