import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostablogComponent } from './postablog.component';

describe('PostablogComponent', () => {
  let component: PostablogComponent;
  let fixture: ComponentFixture<PostablogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostablogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostablogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
