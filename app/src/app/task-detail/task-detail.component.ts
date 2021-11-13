import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task = {id: 0, name: "Test", description: "Test Desc", deadline: new Date(Date.now()), complete: false};

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId != null) {
      this.taskService.getTaskById(+taskId).subscribe(result => this.task = result);
    }
  }
}
