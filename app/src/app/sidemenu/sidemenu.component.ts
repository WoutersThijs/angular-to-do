import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { Observable } from 'rxjs';
import $ from 'jquery';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  lists$: Observable<List[]> = new Observable<List[]>();

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.lists$ = this.listService.getLists();
  }

  showTasks(id: number) {
    this.router.navigate(['/task', id]);
  }
}
