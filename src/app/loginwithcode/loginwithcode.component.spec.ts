import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwithcodeComponent } from './loginwithcode.component';

describe('LoginwithcodeComponent', () => {
  let component: LoginwithcodeComponent;
  let fixture: ComponentFixture<LoginwithcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginwithcodeComponent]
    });
    fixture = TestBed.createComponent(LoginwithcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
