import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Task} from '../interfaces/task.interface';
import {TaskService} from '../services/task.service';
import { ListStateService } from '../services/list-state.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  deleteTask$: Subscription = new Subscription();

  list_id: number = 0;

  errorMessage: string = '';

  constructor(private taskService: TaskService, private listStateService: ListStateService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTasks();

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.list_id = params['listId'];
        this.listStateService.updatePathParamState(params['listId'])
      }
    )
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
    this.deleteTask$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['lists/' + this.list_id + '/new-task'], {state: { mode: 'add'}});
  }

  edit(id: number) {
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

  delete(id: number) {
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
        this.tasks$ = this.taskService.getTasksByList(this.list_id).subscribe(result => this.tasks = result);
      }
    )
  }
}

