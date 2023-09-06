import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepicComponent } from './profilepic.component';

describe('ProfilepicComponent', () => {
  let component: ProfilepicComponent;
  let fixture: ComponentFixture<ProfilepicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilepicComponent]
    });
    fixture = TestBed.createComponent(ProfilepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
