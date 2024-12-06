import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubservicetableComponent } from './subservicetable.component';

describe('SubservicetableComponent', () => {
  let component: SubservicetableComponent;
  let fixture: ComponentFixture<SubservicetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubservicetableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubservicetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
