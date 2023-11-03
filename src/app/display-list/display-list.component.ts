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
  fetchUsersInterval!: any;

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

    this.fetchNewUsers();
  }

  favouriteIconClicked(item: DisplayListData) {
    item.is_favorite = !item.is_favorite
  }

  fetchNewUsers() {
    this.fetchUsersInterval = setInterval(() => {
      this.displayListService.getSingleUser().subscribe(data => {
        this.list.push(data);
        if (this.list.length > 10) {
          this.list.shift(); // Remove the oldest user
        }
        // Check the stop condition here
      if (data.id === data.totalItems) {
        clearInterval(this.fetchUsersInterval);
      }
      });
    }, 5000); // Fetch every 5 seconds
  }

}
