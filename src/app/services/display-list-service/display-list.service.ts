import { Injectable } from '@angular/core'
import { FetchDisplayListServiceApi } from '../api-service/fetch-display-list-api.service'
import { Observable, catchError, map, throwError } from 'rxjs';
import { DisplayListData, RawDisplayListData } from 'src/app/interface/display-list-items';

@Injectable({
  providedIn: 'root'
})
export class DisplayListService {
  constructor (private readonly apiService: FetchDisplayListServiceApi) { }

  getDisplayList(): Observable<DisplayListData[]> {
    return this.apiService.fetchDisplayList().pipe(
      map((response: Object) => (response as RawDisplayListData).data as DisplayListData[]),
      catchError((error) => {
        console.error('Service level error:', error);
        // Optionally, you can return an empty array or a default value
        return throwError(() => 'Simulated error');
        //return throwError('Simulated error'); // Import 'of' from 'rxjs' if not already imported
      })
    );
  }
}
