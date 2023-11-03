import { Injectable } from '@angular/core'
import { FetchDisplayListServiceApi } from '../api-service/fetch-display-list-api.service'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DisplayListData, RawDisplayListData, SingleUserData } from 'src/app/interface/display-list-items';
import { FetchSingleUserApiService } from '../api-service/fetch-single-user-api.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  private totalItems!: number;
  private currentItemId!: number;
  constructor (
    private readonly listService: FetchDisplayListServiceApi,
    private readonly singleUserService: FetchSingleUserApiService,
    ) { }

    getDisplayList(): Observable<DisplayListData[]> {
      return this.listService.fetchDisplayList().pipe(
        map((response: any) => {
          if (response && response.data) {
            this.totalItems = response.total;
            this.currentItemId = response.data.length;
            return response.data as DisplayListData[];
          } else {
            throw new Error('Invalid response format');
          }
        }),
        catchError((error) => {
          console.error('Service level error:', error);
          // Optionally, you can return an empty array or a default value
          return throwError(() => 'Simulated error');
        })
      );
    }

  getSingleUser(): Observable<DisplayListData> {
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
    if(this.currentItemId < this.totalItems){
      this.currentItemId++
    }
    else{
      this.currentItemId = this.totalItems;
    }
  }
}




