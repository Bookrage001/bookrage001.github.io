import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarenheightToCelsiusComponent } from './farenheight-to-celsius.component';

describe('FarenheightToCelsiusComponent', () => {
  let component: FarenheightToCelsiusComponent;
  let fixture: ComponentFixture<FarenheightToCelsiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarenheightToCelsiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarenheightToCelsiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
