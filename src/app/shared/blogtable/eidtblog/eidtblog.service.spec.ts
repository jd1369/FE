import { TestBed } from '@angular/core/testing';

import { EidtblogService } from './eidtblog.service';

describe('EidtblogService', () => {
  let service: EidtblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EidtblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
