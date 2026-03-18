import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigonotationComponent } from './bigonotation.component';

describe('BigonotationComponent', () => {
  let component: BigonotationComponent;
  let fixture: ComponentFixture<BigonotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigonotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigonotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
