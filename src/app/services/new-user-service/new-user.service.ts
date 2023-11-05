import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
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
        if (response) {
          const displayData = (response as SingleUserData).data as DisplayListData;
          displayData.totalItems = this.totalItems;
          return displayData;
        } else {
          throw new Error('Invalid response format');
        }   
      }),
      catchError((error) => {
        console.error('Service level error:', error);
        clearInterval(this.fetchUsersInterval);
        return throwError(() => 'Simulated error');
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

  fetchNewUsers() {
    this.fetchUsersInterval = setInterval(() => {
      this.getSingleUser().subscribe(data => {
        if(data) {
          this.displayList.push(data);
          if (this.displayList.length > 10) {
            this.displayList.shift(); // Remove the oldest user
          }
          this.displayListService.setDisplayList(this.displayList);
          // Check the stop condition here, if user id reached to maximum of total items in data then stop fetching
          if (data.id === data.totalItems) {
          clearInterval(this.fetchUsersInterval);
          }
        }
        else{
          throw new Error('Invalid response format');
        }
        
      });
    }, 5000); // Fetch every 5 seconds
  }
}
