import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { List } from '../interfaces/list.interface';
import { ListStateService } from '../services/list-state.service';
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

  constructor(private listService: ListService, private listStateService: ListStateService ,private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentList = this.listStateService.pathParam.subscribe((result) => {
      this.list$ = this.listService.getListById(parseInt(result));
      this.list_id = parseInt(result);
    });
  }

  edit() {
    //Navigate to form in edit mode
    this.router.navigate(['lists/' + this.list_id + '/edit'], {state: { mode: 'edit'}});
  }

  toggleSidemenu(){
    if($('.wrapper').hasClass('open')){
      $('.wrapper').removeClass('open');
      $('.wrapper').addClass('closed');
    } else {
      $('.wrapper').removeClass('closed');
      $('.wrapper').addClass('open');
    }
  }
}
