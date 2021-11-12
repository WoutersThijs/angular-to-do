import { Component, OnInit } from '@angular/core';
import $ from 'jquery'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function(){
      if($('.wrapper').hasClass('open')){
        $('.wrapper').removeClass('open');
        $('.wrapper').addClass('closed');
      } else {
        $('.wrapper').removeClass('closed');
        $('.wrapper').addClass('open');
      }
    })
  }
}
