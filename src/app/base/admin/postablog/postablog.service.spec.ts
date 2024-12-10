import { TestBed } from '@angular/core/testing';

import { PostablogService } from './postablog.service';

describe('PostablogService', () => {
  let service: PostablogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostablogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
