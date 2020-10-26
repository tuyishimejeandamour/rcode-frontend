import { TestBed } from '@angular/core/testing';

import { HttpmarksService } from './httpmarks.service';

describe('HttpmarksService', () => {
  let service: HttpmarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
