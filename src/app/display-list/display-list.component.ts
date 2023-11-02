import { Component, OnInit } from '@angular/core'
import { DisplayListService } from '../services/display-list-service/display-list.service';
import { DisplayListData } from '../interface/display-list-items';

@Component({
  selector: 'display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {
  list: DisplayListData[] = [];

  constructor(private displayListService: DisplayListService) { }

  ngOnInit() {
    this.displayListService.getDisplayList().subscribe(data => {
      this.list = data;
      },
    (error) => {
        console.error('Component level error:', error);
      },
    () => {
        console.log('Subscription completed.'); // Log when the subscription is completed.
      }
    );
  }

  favouriteIconClicked(item: DisplayListData) {
    item.is_favorite = !item.is_favorite
  }

}
