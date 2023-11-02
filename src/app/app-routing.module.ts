import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayListComponent } from './display-list/display-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/display-list', pathMatch: 'full' },
  { path: 'display-list', component: DisplayListComponent },
  // { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }