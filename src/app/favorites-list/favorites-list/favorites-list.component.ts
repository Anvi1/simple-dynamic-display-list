import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DisplayListData } from 'src/app/interface/display-list-items';
import { FavoritesListService } from 'src/app/services/favorites-list-service/favorites-list.service';

@Component({
  selector: 'favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  favorites: DisplayListData[] = [];

  constructor(private favoriteService: FavoritesListService,
    private location: Location) { }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe(data => {
      this.favorites = data;
    });
  }
} 
