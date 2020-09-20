import { TestBed } from '@angular/core/testing';

import { QuickhelpService } from './quickhelp.service';

describe('QuickhelpService', () => {
  let service: QuickhelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickhelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
