import { TestBed } from '@angular/core/testing';

import { EditprojectService } from './editproject.service';

describe('EditprojectService', () => {
  let service: EditprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
