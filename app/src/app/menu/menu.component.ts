import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { List } from '../interfaces/list.interface';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  list_id: number = 0;
  list$: Observable<List> = new Observable<List>();
  pathParam!: Observable<string>;
  currentList: Subscription = new Subscription();

  deleteList$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private listService: ListService ,private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  edit() {
    //Navigate to form in edit mode
    this.router.navigate(['lists/' + this.list_id + '/edit'], {state: { mode: 'edit'}});
  }

  delete() {
    console.log(this.list_id);

    this.deleteList$ = this.listService.deleteList(this.list_id).subscribe(result => {
      this.router.navigate(['lists/today']);
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }
}
