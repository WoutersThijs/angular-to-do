import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { HttpClientModule } from '@angular/common/http';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ListFormComponent } from './list-form/list-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidemenuComponent,
    TaskFormComponent,
    TaskListComponent,
    ListFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
