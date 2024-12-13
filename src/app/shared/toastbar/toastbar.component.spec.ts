import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastbarComponent } from './toastbar.component';

describe('ToastbarComponent', () => {
  let component: ToastbarComponent;
  let fixture: ComponentFixture<ToastbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
