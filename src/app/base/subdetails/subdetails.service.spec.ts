import { TestBed } from '@angular/core/testing';

import { SubdetailsService } from './subdetails.service';

describe('SubdetailsService', () => {
  let service: SubdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
