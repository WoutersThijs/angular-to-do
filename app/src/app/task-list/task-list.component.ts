import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../interfaces/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  deleteTask$: Subscription = new Subscription();

  list_id = 0;

  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTasks();

    this.activatedRoute.params.subscribe(routeParams => {
      this.list_id = routeParams.id
    });
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
    this.deleteTask$.unsubscribe();
  }

  add(list_id: number) {
    //Navigate to form in add mode
    this.router.navigate(['task/add'], {state: {list_id: list_id,mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['task/edit'], {state: {id: id, mode: 'edit'}});
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
    this.activatedRoute.params.subscribe(routeParams => {
      this.tasks$.unsubscribe();
      this.tasks$ = this.taskService.getTasksByList(routeParams.id).subscribe(result => this.tasks = result);
    });
  }
}

