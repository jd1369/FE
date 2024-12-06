import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactustableComponent } from './contactustable.component';

describe('ContactustableComponent', () => {
  let component: ContactustableComponent;
  let fixture: ComponentFixture<ContactustableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactustableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactustableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
