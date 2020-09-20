import { TestBed } from '@angular/core/testing';

import { FiletreeService } from './filetree.service';

describe('FiletreeService', () => {
  let service: FiletreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiletreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
