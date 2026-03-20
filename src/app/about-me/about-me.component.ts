import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule
  ]
})
export class AboutMeComponent {
  private printService = inject(PrintService);

  printResume(): void {
    this.printService.print();
  }
}
