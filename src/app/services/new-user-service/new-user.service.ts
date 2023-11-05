import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, catchError, interval, map, throwError } from 'rxjs';
import { DisplayListData, SingleUserData } from 'src/app/interface/display-list-items';
import { FetchSingleUserApiService } from '../api-service/fetch-single-user-api.service';
import { DisplayListService } from '../display-list-service/display-list.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  currentItemId!: number;
  totalItems!: number;
  fetchUsersInterval: any;
  displayList!: DisplayListData[];
  private startFetchingNewDataSubject = new Subject<void>();
  startFetchingNewData$ = this.startFetchingNewDataSubject.asObservable();

  constructor(private readonly singleUserService: FetchSingleUserApiService,
    private readonly displayListService: DisplayListService,
    ) { }

  triggerStartFetchingNewData() {
    this.startFetchingNewDataSubject.next();
  }  

  getSingleUser(): Observable<DisplayListData> {
    this.totalItems = this.displayListService.getTotalItemsNumber();
    this.displayListService.getList().subscribe((displayList) => {
      this.displayList = displayList;
    });

    this.getSingleUserId();
    return this.singleUserService.fetchSingleUser(this.currentItemId).pipe(
      map((response: Object) => {
        const displayData = (response as SingleUserData).data as DisplayListData;
        // Include your additional variable in the result
        displayData.totalItems = this.totalItems;
        return displayData;
      }),
      catchError((error) => {
        console.error('Service level error:', error);
        // Optionally, you can return an empty array or a default value
        return throwError(() => 'Simulated error');
        //return throwError('Simulated error'); // Import 'of' from 'rxjs' if not already imported
      })
    );
  }

  getSingleUserId() {
    if(!this.currentItemId){
      this.currentItemId = this.displayListService.getDefaultItemId();
    }
    if(this.currentItemId < this.totalItems){
      this.currentItemId++
    }
    else{
      this.currentItemId = this.totalItems;
    }
  }

  startFetchingNewUsers() {
    this.fetchNewUsers();
  }

  // private fetchUsers() {
  //   // Implement logic to fetch new users
  //   this.getSingleUser().subscribe((data) => {
  //     this.displayList.push(data);
  //     if (this.displayList.length > 10) {
  //         this.displayList.shift(); // Remove the oldest user
  //     }
  //     this.displayListService.setDisplayList(this.displayList);
  //     // Check the stop condition here
  //     if (data.id === this.totalItems) {
  //       this.stopFetchingNewUsers();
  //     }
  //   });

  //   // Set up the interval for continuous fetching
  //   this.fetchUsersInterval = interval(5000).subscribe(() => {
  //     this.fetchUsers();
  //   });
  // }

  // stopFetchingNewUsers() {
  //   if (this.fetchUsersInterval) {
  //     this.fetchUsersInterval.unsubscribe();
  //   }
  // }

  fetchNewUsers() {
    this.fetchUsersInterval = setInterval(() => {
      this.getSingleUser().subscribe(data => {
        this.displayList.push(data);
        if (this.displayList.length > 10) {
          this.displayList.shift(); // Remove the oldest user
        }
        this.displayListService.setDisplayList(this.displayList);
        // Check the stop condition here
        if (data.id === data.totalItems) {
         clearInterval(this.fetchUsersInterval);
        }
      });
    }, 5000); // Fetch every 5 seconds
  }
}
