import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { FormsModule,  } from '@angular/forms'
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  taskID: number = 0;
  list_id: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  task$: Subscription = new Subscription();
  postTask$: Subscription = new Subscription();
  putTask$: Subscription = new Subscription();

  // reactive form
  taskForm = new FormGroup({
    list_id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    deadline: new FormControl(''),
    complete: new FormControl(),
  });

  constructor(private router: Router, private taskService: TaskService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.taskID = +this.router.getCurrentNavigation()?.extras.state?.id;
    this.list_id = +this.router.getCurrentNavigation()?.extras.state?.list_id;

    if (this.taskID != null && this.taskID > 0) {
      this.task$ = this.taskService.getTasksByID(this.taskID).subscribe(result => {
        this.taskForm.setValue({
          name: result,
          active: result
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.task$.unsubscribe();
    this.postTask$.unsubscribe();
    this.putTask$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;

    this.taskForm.patchValue({
      list_id: this.list_id
    });

    if (this.isAdd) {
      this.postTask$ = this.taskService.postTask(this.taskForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/tasks/" + this.list_id);
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putTask$ = this.taskService.putTask(this.taskID, this.taskForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/tasks/" + this.list_id);              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
