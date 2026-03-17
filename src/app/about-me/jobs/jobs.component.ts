import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { Observable, map } from 'rxjs';
import { JobItem } from './job-item';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatButtonModule]
})
export class JobsComponent {
  allJobs$: Observable<JobItem[]>;
  jobs$: Observable<JobItem[]>;
  tags$: Observable<string[]>;
  selectedTags: string[] = [];

  private jobservice = inject(JobService);

  constructor() {
    this.allJobs$ = this.jobservice.getAds();
    this.jobs$ = this.allJobs$;
    this.tags$ = this.allJobs$.pipe(
      map((jobs) => {
        const uniqueTags = jobs.reduce((set, job) => {
          (job.data.tags ?? []).forEach((tag) => set.add(tag));
          return set;
        }, new Set<string>());

        return Array.from(uniqueTags).sort((a, b) => a.localeCompare(b));
      })
    );
  }

  onTagChange(tag: string): void {
    const isSelected = this.selectedTags.includes(tag);
    this.selectedTags = isSelected
      ? this.selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...this.selectedTags, tag];

    this.jobs$ = this.allJobs$.pipe(
      map((jobs) =>
        this.selectedTags.length === 0
          ? jobs
          : jobs.filter((job) => (job.data.tags ?? []).some((jobTag) => this.selectedTags.includes(jobTag)))
      )
    );
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  clearTagFilter(): void {
    this.selectedTags = [];
    this.jobs$ = this.allJobs$;
  }
}

