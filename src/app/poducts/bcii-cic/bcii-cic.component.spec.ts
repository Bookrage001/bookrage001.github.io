import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BciiCicComponent } from './bcii-cic.component';

describe('BciiCicComponent', () => {
  let component: BciiCicComponent;
  let fixture: ComponentFixture<BciiCicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BciiCicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BciiCicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
