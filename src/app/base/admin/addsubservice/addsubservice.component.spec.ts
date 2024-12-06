import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubserviceComponent } from './addsubservice.component';

describe('AddsubserviceComponent', () => {
  let component: AddsubserviceComponent;
  let fixture: ComponentFixture<AddsubserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
