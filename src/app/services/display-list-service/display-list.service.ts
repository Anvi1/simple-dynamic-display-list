import { Injectable } from '@angular/core'
import { FetchDisplayListServiceApi } from '../api-service/fetch-display-list-api.service'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DisplayListData, RawDisplayListData, SingleUserData } from 'src/app/interface/display-list-items';
import { FetchSingleUserApiService } from '../api-service/fetch-single-user-api.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  private totalItems!: number;
  private currentItemId!: number;
  private displayListSubject = new BehaviorSubject<DisplayListData[]>([]);
  displayList$ = this.displayListSubject.asObservable();

  constructor (
    private readonly listService: FetchDisplayListServiceApi,
    ) { }

    getDisplayListFromApi(): Observable<DisplayListData[]> {
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

  getDefaultItemId() {
    return this.currentItemId;
  }  

  getTotalItemsNumber() {
    return this.totalItems;
  } 

  setList(data: DisplayListData[]) {
    this.displayListSubject.next(data);
  }

  getList(): Observable<DisplayListData[]> {
    return this.displayList$;
  }

  setDisplayList(data: DisplayListData[]) {
    this.setList(data);
  }

  getDisplayList() {
    this.getList().subscribe((displayList) => {
      if(displayList.length>0){
        this.setList(displayList)
        return displayList;
      }
      else{
        return [];
      }     
    });
  }

}




