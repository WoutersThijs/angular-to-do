import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task } from '../interfaces/task.interface';
import { List } from '../interfaces/list.interface';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient, private taskService: TaskService) { }

  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();

  getLists(): Observable<List[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<List[]>("http://localhost:3000/lists")));
  }

  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  }

  postList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", list, {headers: headers});
  }

  putList(listID: number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<List>("http://localhost:3000/lists/" + listID, list, {headers: headers});
  }

  deleteList(listID: number): Observable<List> {
    this.tasks$ = this.taskService.getTasksByList(listID).subscribe(result => this.tasks = result);

    for(let task of this.tasks){
      console.log(task.id)
      this.taskService.deleteTask(task.id);
    }

    this.tasks$.unsubscribe();

    return this.httpClient.delete<List>("http://localhost:3000/lists/" + listID);
  }
}
