import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtblogComponent } from './eidtblog.component';

describe('EidtblogComponent', () => {
  let component: EidtblogComponent;
  let fixture: ComponentFixture<EidtblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EidtblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EidtblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
