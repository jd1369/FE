import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogtableComponent } from './blogtable.component';

describe('BlogtableComponent', () => {
  let component: BlogtableComponent;
  let fixture: ComponentFixture<BlogtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
