import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * PrintService handles printing functionality with automatic print date header
 *
 * Usage:
 * 1. Inject the PrintService into your component
 * 2. Call printService.print() to open the print dialog
 * 3. The print header automatically displays:
 *    - "Last edited: [date from jobs.json]"
 *    - "Printed on: [current date and time]"
 *
 * To update the "last edited" date:
 * - Modify the "lastEdited" field in src/app/services/jobs.json (format: YYYY-MM-DD)
 */
@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private http = inject(HttpClient);
  private lastEditedDate: string = '';

  constructor() {
    this.loadLastEditedDate();
  }

  /**
   * Load the last edited date from the jobs.json data
   */
  private loadLastEditedDate(): void {
    this.http.get<any>('/src/app/services/jobs.json').subscribe((data) => {
      if (data && data.lastEdited) {
        this.lastEditedDate = data.lastEdited;
      }
    });
  }

  /**
   * Format a date string (YYYY-MM-DD) for display
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Get the last edited date
   * @returns Formatted last edited date
   */
  getLastEditedDate(): string {
    return this.formatDate(this.lastEditedDate || new Date().toISOString().split('T')[0]);
  }

  /**
   * Get the current date and time formatted for printing
   * @returns Formatted date and time string with last edited date
   */
  getPrintDate(): string {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const printDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const lastEdited = this.getLastEditedDate();
    return `Last edited: ${lastEdited} | Printed on ${printDate} at ${time}`;
  }

  /**
   * Initialize the print date in the DOM for CSS to access
   */
  initializePrintDate(): void {
    const printDate = this.getPrintDate();
    document.documentElement.style.setProperty('--print-date', `"${printDate}"`);
  }

  /**
   * Open the browser's print dialog
   * Sets document title as filename hint (for PDF save dialog)
   */
  print(fileNameSuffix?: string): void {
    this.initializePrintDate();

    // Set document title for PDF filename
    const originalTitle = document.title;
    const today = new Date().toISOString().split('T')[0];
    const suffix = fileNameSuffix?.trim();
    const suffixPart = suffix ? `-${suffix}` : '';
    document.title = `Caleb-Ardern-Resume${suffixPart}-${today}`;

    window.print();

    // Restore original title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 250);
  }
}
