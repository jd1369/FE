import { TestBed } from '@angular/core/testing';

import { SubservicetableService } from './subservicetable.service';

describe('SubservicetableService', () => {
  let service: SubservicetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubservicetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
