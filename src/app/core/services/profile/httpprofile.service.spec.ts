import { TestBed } from '@angular/core/testing';

import { HttpprofileService } from './httpprofile.service';

describe('HttpprofileService', () => {
  let service: HttpprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
