import { Component, OnInit } from '@angular/core'
import { DisplayListService } from '../services/display-list-service/display-list.service';
import { DisplayListData } from '../interface/display-list-items';
import { FavoritesListService } from '../services/favorites-list-service/favorites-list.service';
import { NewUserService } from '../services/new-user-service/new-user.service';

@Component({
  selector: 'display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {
  list: DisplayListData[] | undefined;
  fetchUsersInterval!: any;
  displayAddToFavoritesWarning: boolean = false;

  constructor(
    private displayListService: DisplayListService,
    private favoritesListService: FavoritesListService,
    private fetchNewUserService: NewUserService,
    ) { }

  ngOnInit() {
    this.displayListService.getList().subscribe((displayList) => {
      this.list = displayList;
    });

    if(this.list?.length === 0){
      this.displayListService.getDisplayListFromApi().subscribe(data => {
        this.list = data;
        this.displayListService.setDisplayList(data);
        this.fetchNewUserService.startFetchingNewUsers();
        },
      (error) => {
          console.error('Component level error:', error);
        },
      () => {
          console.log('Subscription completed.'); // Log when the subscription is completed.
        }
      );
    }

  }

  favouriteIconClicked(item: DisplayListData) {
    item.is_favorite = !item.is_favorite;
    if(item.is_favorite){
      this.favoritesListService.addFavorite(item);
      this.displayAddToFavoritesWarning = !item.is_favorite ? true : false;
    }
    else{
      this.favoritesListService.removeFavorite(item);
      this.displayAddToFavoritesWarning = false;
    }
  }

}
