import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlatEditComponent } from './plat/plat-edit/plat-edit.component';
import { PlatListComponent } from './plat/plat-list/plat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AccueilComponent,
    MenuListComponent,
    MenuItemComponent,
    MenuEditComponent,
    MenuDetailComponent,
    PlatEditComponent,
    PlatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
