import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task/task.component';
import { TasklistComponent } from './tasklist/tasklist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasklist', component: TasklistComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task/:id', component: TaskDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
