import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivemarksComponent } from './givemarks.component';

describe('GivemarksComponent', () => {
  let component: GivemarksComponent;
  let fixture: ComponentFixture<GivemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
