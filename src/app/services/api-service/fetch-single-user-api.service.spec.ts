import { TestBed } from '@angular/core/testing';

import { FetchSingleUserApiService } from './fetch-single-user-api.service';

describe('FetchSingleUserApiService', () => {
  let service: FetchSingleUserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchSingleUserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
