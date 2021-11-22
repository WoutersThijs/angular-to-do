import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

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
}
