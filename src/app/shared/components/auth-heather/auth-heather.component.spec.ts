import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHeatherComponent } from './auth-heather.component';

describe('AuthHeatherComponent', () => {
  let component: AuthHeatherComponent;
  let fixture: ComponentFixture<AuthHeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
