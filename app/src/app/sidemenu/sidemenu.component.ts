import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list.interface';
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
    if($('.wrapper').hasClass('open') && $(window).width()! < 992){
      console.log("sddd")
      $('.wrapper').removeClass('open');
      $('.wrapper').addClass('closed');
    }

    $(window).resize(function(){
      if($(window).width()! < 992){
        if($('.wrapper').hasClass('open')){
          console.log("sddd")
          $('.wrapper').removeClass('open');
          $('.wrapper').addClass('closed');
        }
      }
     });
  }

  showTasks(id: number) {
    this.router.navigate(['/lists', id]);
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['new-list'], {state: { mode: 'add'}});
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
