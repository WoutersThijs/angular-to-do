import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {id: 0, name: "Test", description: "Test Desc", deadline: new Date(Date.now()), complete: false};

  constructor() { }

  ngOnInit(): void {
  }

}
