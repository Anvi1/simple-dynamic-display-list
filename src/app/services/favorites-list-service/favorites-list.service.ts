import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DisplayListData } from 'src/app/interface/display-list-items';

@Injectable({
  providedIn: 'root'
})
export class FavoritesListService {

  private favorites: DisplayListData[] = [];
  private favoritesSubject = new BehaviorSubject<DisplayListData[]>([]);

  getFavorites() {
    return this.favoritesSubject.asObservable();
  }

  addFavorite(user: DisplayListData) {
    if (this.favorites.length < 10) {
      this.favorites.push(user);
      this.favoritesSubject.next(this.favorites);
    }
    else{
      user.is_favorite = false;
    }
  }

  removeFavorite(user: DisplayListData) {
    const index = this.favorites.indexOf(user);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.favoritesSubject.next(this.favorites);
    }
  }
}
