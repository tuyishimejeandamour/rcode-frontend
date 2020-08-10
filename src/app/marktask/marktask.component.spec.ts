import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarktaskComponent } from './marktask.component';

describe('MarktaskComponent', () => {
  let component: MarktaskComponent;
  let fixture: ComponentFixture<MarktaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarktaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarktaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
