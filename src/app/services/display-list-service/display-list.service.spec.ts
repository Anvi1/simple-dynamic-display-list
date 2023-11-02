import { TestBed } from '@angular/core/testing';

import { DisplayListService } from './display-list.service';

describe('DisplayListService', () => {
  let service: DisplayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
