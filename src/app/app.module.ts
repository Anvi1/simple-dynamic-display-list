import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritesListComponent } from './favorites-list/favorites-list/favorites-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayListComponent,
    FavoritesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
