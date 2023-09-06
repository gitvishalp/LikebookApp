import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchusersComponent } from './searchusers.component';

describe('SearchusersComponent', () => {
  let component: SearchusersComponent;
  let fixture: ComponentFixture<SearchusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchusersComponent]
    });
    fixture = TestBed.createComponent(SearchusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
