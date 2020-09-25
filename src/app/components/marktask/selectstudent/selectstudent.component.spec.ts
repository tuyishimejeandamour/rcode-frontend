import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectstudentComponent } from './selectstudent.component';

describe('SelectstudentComponent', () => {
  let component: SelectstudentComponent;
  let fixture: ComponentFixture<SelectstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
