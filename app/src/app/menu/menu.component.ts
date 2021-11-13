import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
