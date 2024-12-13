import { TestBed } from '@angular/core/testing';

import { ToastbarService } from './toastbar.service';

describe('ToastbarService', () => {
  let service: ToastbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
