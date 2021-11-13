import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskComponent } from './task/task.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

import { HttpClientModule } from '@angular/common/http';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TasklistComponent,
    TaskComponent,
    SidemenuComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
