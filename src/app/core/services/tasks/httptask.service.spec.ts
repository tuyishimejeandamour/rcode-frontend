import { TestBed } from '@angular/core/testing';

import { HttptaskService } from './httptask.service';

describe('HttptaskService', () => {
  let service: HttptaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttptaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
