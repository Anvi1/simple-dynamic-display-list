import { TestBed } from '@angular/core/testing'

import { FetchDisplayListServiceApi } from './fetch-display-list-api.service'

describe('FetchDisplayListService', () => {
  let service: FetchDisplayListServiceApi

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FetchDisplayListServiceApi)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
