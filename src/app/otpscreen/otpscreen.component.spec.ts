import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpscreenComponent } from './otpscreen.component';

describe('OtpscreenComponent', () => {
  let component: OtpscreenComponent;
  let fixture: ComponentFixture<OtpscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpscreenComponent]
    });
    fixture = TestBed.createComponent(OtpscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
