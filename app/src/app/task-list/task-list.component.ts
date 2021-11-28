import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Task} from '../interfaces/task.interface';
import {TaskService} from '../services/task.service';
import { ListService } from '../services/list.service';
import { List } from '../interfaces/list.interface';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  deleteTask$: Subscription = new Subscription();
  list$: Observable<List> = new Observable<List>();

  list_id: number = 0;

  errorMessage: string = '';

  constructor(private taskService: TaskService, private listService: ListService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTasks();

    if(this.list_id != null){
      this.list$ = this.listService.getListById(this.list_id);

      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.list_id = params['listId'];
          this.list$ = this.listService.getListById(this.list_id);
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
    this.deleteTask$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['lists/' + this.list_id + '/new-task'], {state: { mode: 'add'}});
  }

  editTask(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['lists/' + this.list_id + '/task/' + id + '/edit'], {state: { mode: 'edit'}});
  }

  complete(id: number, is_complete: boolean) {
    if(is_complete){
      this.taskService.completeTask(id, false).subscribe(() => {
      })
    } else {
      this.taskService.completeTask(id, true).subscribe(() => {
      })
    }
    this.getTasks();
  }

  deleteTask(id: number) {
    this.deleteTask$ = this.taskService.deleteTask(id).subscribe(result => {
      //all went well
      this.getTasks();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getTasks() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tasks$.unsubscribe();
        this.list_id = params['listId'];

        if(this.list_id == null){
          this.tasks$ = this.taskService.getTodayTasks().subscribe(result => this.tasks = result);
        } else {
          this.tasks$ = this.taskService.getTasksByList(this.list_id).subscribe(result => this.tasks = result);
        }
      }
    )
  }

  editList() {
    //Navigate to form in edit mode
    this.router.navigate(['lists/' + this.list_id + '/edit'], {state: { mode: 'edit'}});
  }

  deleteList() {
    this.deleteTask$ = this.listService.deleteList(this.list_id).subscribe(result => {
      this.router.navigate(['']);
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }
}

