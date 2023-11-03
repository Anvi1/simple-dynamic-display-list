import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchSingleUserApiService {

  private readonly apiURL = 'https://reqres.in/api/users'

  constructor (private readonly http: HttpClient) { }

  fetchSingleUser(totalItems: number) {
    return this.http.get(`${this.apiURL}/${totalItems}`)
  }
}
