import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinguploadComponent } from './landingupload.component';

describe('LandinguploadComponent', () => {
  let component: LandinguploadComponent;
  let fixture: ComponentFixture<LandinguploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandinguploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandinguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
