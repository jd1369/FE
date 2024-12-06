import { TestBed } from '@angular/core/testing';

import { ContactustableService } from './contactustable.service';

describe('ContactustableService', () => {
  let service: ContactustableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactustableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
