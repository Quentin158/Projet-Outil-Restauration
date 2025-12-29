import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';

const routes: Routes = [
  { path: 'menus',        component:MenuListComponent },
  { path: 'menu/new',     component:MenuEditComponent },
  { path: 'menu/edit/:id',component:MenuEditComponent },
  { path: 'menu/:id',    component:MenuDetailComponent },
  { path: '', component:AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
