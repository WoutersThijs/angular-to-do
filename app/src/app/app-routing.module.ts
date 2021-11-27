import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists/today', pathMatch: 'full' },
  { path: 'lists/:listId', component: TaskListComponent },
  { path: 'lists/:listId/new-task', component: TaskFormComponent },
  { path: 'lists/:listId/task/:taskId/edit', component: TaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
