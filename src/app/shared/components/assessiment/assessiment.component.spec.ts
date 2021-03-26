import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessimentComponent } from './assessiment.component';

describe('AssessimentComponent', () => {
  let component: AssessimentComponent;
  let fixture: ComponentFixture<AssessimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
