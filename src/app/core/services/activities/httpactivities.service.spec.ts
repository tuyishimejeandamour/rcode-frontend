import { TestBed } from '@angular/core/testing';

import { HttpactivitiesService } from './httpactivities.service';

describe('HttpactivitiesService', () => {
  let service: HttpactivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpactivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
