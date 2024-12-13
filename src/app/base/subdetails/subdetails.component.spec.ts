import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdetailsComponent } from './subdetails.component';

describe('SubdetailsComponent', () => {
  let component: SubdetailsComponent;
  let fixture: ComponentFixture<SubdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
