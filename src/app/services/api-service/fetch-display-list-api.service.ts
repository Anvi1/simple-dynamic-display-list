import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchDisplayListServiceApi {
  private readonly apiURL = 'https://reqres.in/api/users'

  constructor (private readonly http: HttpClient) { }

  fetchDisplayList () {
    return this.http.get(`${this.apiURL}?per_page=10`)
  }
}
