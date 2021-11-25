import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { Observable, Subscription } from 'rxjs';
import $ from 'jquery';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  errorMessage: string = '';

  lists$: Observable<List[]> = new Observable<List[]>();
  postList$: Subscription = new Subscription();

  listForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.lists$ = this.listService.getLists();
  }

  showTasks(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  onSubmit(): void {
    this.postList$ = this.listService.postList(this.listForm.value).subscribe(result => {
      this.router.navigate(['/tasks', result.id]);
      this.lists$ = this.listService.getLists();
      $('#name').val('')
    },
    error => {
      this.errorMessage = error.message;
    });
  }
}
