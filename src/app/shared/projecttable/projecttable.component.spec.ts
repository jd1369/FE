import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttableComponent } from './projecttable.component';

describe('ProjecttableComponent', () => {
  let component: ProjecttableComponent;
  let fixture: ComponentFixture<ProjecttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
