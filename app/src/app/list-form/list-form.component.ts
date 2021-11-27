import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from '../services/list.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  list_id: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  list$: Subscription = new Subscription();
  postList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();

  // reactive form
  taskForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(private router: Router, private listService: ListService, private activatedRoute: ActivatedRoute) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';

    if(this.isEdit){
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.list_id = params['listId'];
          console.log(params['listId'])
        }
      )
    }

    if (this.list_id != null && this.list_id > 0) {

      this.list$ = this.listService.getListById(this.list_id).subscribe(result => {
        this.taskForm.setValue({
          name: result.name,
          category: result.category
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.list$.unsubscribe();
    this.postList$.unsubscribe();
    this.putList$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;


    if (this.isAdd) {
      this.postList$ = this.listService.postList(this.taskForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/lists/" + result.id);
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putList$ = this.listService.putList(this.list_id, this.taskForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/lists/" + this.list_id);              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
