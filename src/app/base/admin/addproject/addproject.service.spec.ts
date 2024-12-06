import { TestBed } from '@angular/core/testing';

import { AddprojectService } from './addproject.service';

describe('AddprojectService', () => {
  let service: AddprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
