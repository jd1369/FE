import { TestBed } from '@angular/core/testing';

import { AddsubserviceService } from './addsubservice.service';

describe('AddsubserviceService', () => {
  let service: AddsubserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddsubserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
