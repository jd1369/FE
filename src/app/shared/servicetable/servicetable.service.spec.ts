import { TestBed } from '@angular/core/testing';

import { ServicetableService } from './servicetable.service';

describe('ServicetableService', () => {
  let service: ServicetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
