import { TestBed } from '@angular/core/testing';

import { SubservicesdetailsService } from './subservicesdetails.service';

describe('SubservicesdetailsService', () => {
  let service: SubservicesdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubservicesdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
