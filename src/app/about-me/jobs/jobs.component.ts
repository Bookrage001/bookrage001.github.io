import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { Observable } from 'rxjs';
import { JobItem } from './job-item';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobsComponent {
  jobs$: Observable<JobItem[]>;

  private jobservice = inject(JobService);

  constructor() {
    this.jobs$ = this.jobservice.getAds();
  }
}

