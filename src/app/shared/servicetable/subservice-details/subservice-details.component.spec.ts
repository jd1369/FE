import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubserviceDetailsComponent } from './subservice-details.component';

describe('SubserviceDetailsComponent', () => {
  let component: SubserviceDetailsComponent;
  let fixture: ComponentFixture<SubserviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubserviceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubserviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
