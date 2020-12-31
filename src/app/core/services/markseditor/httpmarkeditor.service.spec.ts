import { TestBed } from '@angular/core/testing';

import { HttpmarkeditorService } from './httpmarkeditor.service';

describe('HttpmarkeditorService', () => {
  let service: HttpmarkeditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmarkeditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
