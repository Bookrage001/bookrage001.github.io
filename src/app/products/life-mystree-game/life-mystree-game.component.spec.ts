import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifeMystreeGameComponent } from './life-mystree-game.component';

describe('LifeMystreeGameComponent', () => {
  let component: LifeMystreeGameComponent;
  let fixture: ComponentFixture<LifeMystreeGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeMystreeGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeMystreeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
