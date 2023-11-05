import { Component, OnInit } from '@angular/core';
import { NewUserService } from './services/new-user-service/new-user.service';
import { DisplayListService } from './services/display-list-service/display-list.service';
import { DisplayListData } from './interface/display-list-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  defaultDisplayList!: DisplayListData[];
  title = 'simple-dynamic-display-list';

  constructor(private fetchNewUserService: NewUserService,
    ) {}

  ngOnInit() {
    // Start fetching new data in background every 5 seconds
    this.fetchNewUserService.startFetchingNewData$.subscribe(() => {
      this.fetchNewUserService.startFetchingNewUsers();
    },
    (error) => {
        console.error('Component level error:', error);
      },
    );
  }
}
