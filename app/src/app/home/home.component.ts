import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }
}
