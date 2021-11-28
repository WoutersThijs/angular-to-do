import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { FormsModule,  } from '@angular/forms'
import { Task } from '../interfaces/task.interface';

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
  task_id: number = 0;

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
    deadline: new FormControl(''),
    complete: new FormControl(),
  });

  constructor(private router: Router, private taskService: TaskService, private activatedRoute: ActivatedRoute) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.list_id = params['listId'];
        this.task_id = params['taskId'];
      }
    )

    if (this.task_id != null && this.task_id > 0) {

      this.task$ = this.taskService.getTasksByID(this.task_id).subscribe(result => {
        this.taskForm.setValue({
          list_id: result.list_id,
          name: result.name,
          deadline: result.deadline,
          complete: result.complete,
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
                this.router.navigateByUrl("/lists/" + this.list_id);
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putTask$ = this.taskService.putTask(this.task_id, this.taskForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/lists/" + this.list_id);              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

  back(){
    this.router.navigateByUrl("/lists/" + this.list_id);
  }
}
