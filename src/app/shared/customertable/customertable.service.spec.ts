import { TestBed } from '@angular/core/testing';

import { CustomertableService } from './customertable.service';

describe('CustomertableService', () => {
  let service: CustomertableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomertableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
