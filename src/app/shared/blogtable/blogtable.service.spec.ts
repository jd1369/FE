import { TestBed } from '@angular/core/testing';

import { BlogtableService } from './blogtable.service';

describe('BlogtableService', () => {
  let service: BlogtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
