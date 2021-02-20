import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryToDecimalComponent } from './binary-to-decimal.component';

describe('BinaryToDecimalComponent', () => {
  let component: BinaryToDecimalComponent;
  let fixture: ComponentFixture<BinaryToDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryToDecimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryToDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
