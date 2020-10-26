import { TestBed } from '@angular/core/testing';

import { GettasksService } from './gettasks.service';

describe('GettasksService', () => {
  let service: GettasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
