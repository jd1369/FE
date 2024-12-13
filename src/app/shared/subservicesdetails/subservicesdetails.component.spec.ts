import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubservicesdetailsComponent } from './subservicesdetails.component';

describe('SubservicesdetailsComponent', () => {
  let component: SubservicesdetailsComponent;
  let fixture: ComponentFixture<SubservicesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubservicesdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubservicesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
