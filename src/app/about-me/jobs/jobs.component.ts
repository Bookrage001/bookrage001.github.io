import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobItem } from './job-item';
import { JobService } from '../../services/job.service';
import { JobComponent } from './job.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobsComponent {
  jobs$: Observable<JobComponent[]>;

  constructor(private jobservice: JobService) {
    this.jobs$ = this.jobservice.getAds();
  }
}

