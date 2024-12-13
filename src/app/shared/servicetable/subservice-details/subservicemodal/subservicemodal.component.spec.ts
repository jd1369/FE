import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubservicemodalComponent } from './subservicemodal.component';

describe('SubservicemodalComponent', () => {
  let component: SubservicemodalComponent;
  let fixture: ComponentFixture<SubservicemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubservicemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubservicemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
