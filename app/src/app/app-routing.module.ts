import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListFormComponent } from './list-form/list-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists/today', pathMatch: 'full' },
  { path: 'lists/today', component: TaskListComponent },
  { path: 'lists/this-week', component: TaskListComponent },
  { path: 'lists/trash', component: TaskListComponent },
  { path: 'lists/:listId', component: TaskListComponent },

  { path: 'new-list', component: ListFormComponent },
  { path: 'lists/:listId/edit', component: ListFormComponent },

  { path: 'lists/:listId/new-task', component: TaskFormComponent },
  { path: 'lists/:listId/task/:taskId/edit', component: TaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
