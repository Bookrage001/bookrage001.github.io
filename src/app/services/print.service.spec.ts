import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrintService } from './print.service';

describe('PrintService', () => {
  let service: PrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrintService]
    });
    service = TestBed.inject(PrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return formatted print date with last edited and print time', () => {
    const printDate = service.getPrintDate();
    expect(printDate).toBeTruthy();
    expect(typeof printDate).toBe('string');
    expect(printDate).toContain('Last edited:');
    expect(printDate).toContain('Printed on');
  });

  it('should set print date CSS variable', () => {
    service.initializePrintDate();
    const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--print-date');
    expect(cssValue).toBeTruthy();
  });

  it('should call window.print when print method is invoked', () => {
    spyOn(window, 'print');
    service.print();
    expect(window.print).toHaveBeenCalled();
  });
});
