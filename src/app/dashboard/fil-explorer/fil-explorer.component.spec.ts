import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilExplorerComponent } from './fil-explorer.component';

describe('FilExplorerComponent', () => {
  let component: FilExplorerComponent;
  let fixture: ComponentFixture<FilExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
