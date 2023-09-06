import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestfriendComponent } from './suggestfriend.component';

describe('SuggestfriendComponent', () => {
  let component: SuggestfriendComponent;
  let fixture: ComponentFixture<SuggestfriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestfriendComponent]
    });
    fixture = TestBed.createComponent(SuggestfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
