import { TestBed } from '@angular/core/testing';

import { JerwisService } from './jerwis.service';

describe('JerwisService', () => {
  let service: JerwisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JerwisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
