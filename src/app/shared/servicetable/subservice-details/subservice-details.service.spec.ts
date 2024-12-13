import { TestBed } from '@angular/core/testing';

import { SubserviceDetailsService } from './subservice-details.service';

describe('SubserviceDetailsService', () => {
  let service: SubserviceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubserviceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
