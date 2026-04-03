import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatCheckboxModule,
    MatButtonToggleModule
  ]
})
export class AboutMeComponent {
  private printService = inject(PrintService);
  compactPrintMode = false;
  resumeMode: 'all' | 'business' | 'software' = 'software';

  get resumeModeLabel(): string {
    if (this.resumeMode === 'business') {
      return 'Business Analyst Focus';
    }

    if (this.resumeMode === 'software') {
      return 'Software Development Focus';
    }

    return 'Balanced Focus';
  }

  onCompactPrintModeChange(event: MatCheckboxChange): void {
    this.compactPrintMode = event.checked;
  }

  onResumeModeChange(event: MatButtonToggleChange): void {
    this.resumeMode = event.value;
  }

  onRoleFocusChange(focus: 'all' | 'business' | 'software'): void {
    this.resumeMode = focus;
  }

  printResume(): void {
    this.printService.print(this.compactPrintMode ? 'Compact' : undefined);
  }
}
