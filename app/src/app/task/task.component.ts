import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {id: 0, name: "Test", description: "Test Desc", deadline: new Date(Date.now()), complete: false};
  @Input() isDetail: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/task', id]);
  }
}
