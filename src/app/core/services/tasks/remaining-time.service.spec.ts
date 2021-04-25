import { TestBed } from '@angular/core/testing';

import { RemainingTimeService } from './remaining-time.service';

describe('RemainingTimeService', () => {
  let service: RemainingTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemainingTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
