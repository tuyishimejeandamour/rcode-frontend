import { TestBed } from '@angular/core/testing';

import { HttpexplorerService } from './httpexplorer.service';

describe('HttpexplorerService', () => {
  let service: HttpexplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpexplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
