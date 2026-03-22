import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { JobsComponent } from './jobs/jobs.component';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    JobsComponent,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class AboutMeComponent {
  private printService = inject(PrintService);
  compactPrintMode = false;

  onCompactPrintModeChange(event: MatCheckboxChange): void {
    this.compactPrintMode = event.checked;
  }

  printResume(): void {
    this.printService.print(this.compactPrintMode ? 'Compact' : undefined);
  }
}
