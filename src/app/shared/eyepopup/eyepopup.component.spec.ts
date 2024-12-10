import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyepopupComponent } from './eyepopup.component';

describe('EyepopupComponent', () => {
  let component: EyepopupComponent;
  let fixture: ComponentFixture<EyepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
