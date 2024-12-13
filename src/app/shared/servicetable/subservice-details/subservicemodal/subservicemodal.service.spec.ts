import { TestBed } from '@angular/core/testing';

import { SubservicemodalService } from './subservicemodal.service';
describe('SubservicemodalService', () => {
  let service: SubservicemodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubservicemodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
