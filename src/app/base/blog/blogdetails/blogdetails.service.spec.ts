import { TestBed } from '@angular/core/testing';

import { BlogdetailsService } from './blogdetails.service';

describe('BlogdetailsService', () => {
  let service: BlogdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
