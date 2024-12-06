import { TestBed } from '@angular/core/testing';

import { ProjecttableService } from './projecttable.service';

describe('ProjecttableService', () => {
  let service: ProjecttableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjecttableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
