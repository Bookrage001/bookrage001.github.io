import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { Observable, map } from 'rxjs';
import { JobItem } from './job-item';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatButtonModule, MatCheckboxModule]
})
export class JobsComponent {
  allJobs$: Observable<JobItem[]>;
  jobs$: Observable<JobItem[]>;
  tags$: Observable<string[]>;
  techTags$: Observable<string[]>;
  selectedTags: string[] = [];
  selectedTechTags: string[] = [];
  filtersVisible = false;
  showTags = false;
  showTechTags = false;

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

    this.techTags$ = this.allJobs$.pipe(
      map((jobs) => {
        const uniqueTags = jobs.reduce((set, job) => {
          (job.data.techTags ?? []).forEach((tag) => set.add(tag));
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

    this.applyFilters();
  }

  onTechTagChange(tag: string): void {
    const isSelected = this.selectedTechTags.includes(tag);
    this.selectedTechTags = isSelected
      ? this.selectedTechTags.filter((selectedTag) => selectedTag !== tag)
      : [...this.selectedTechTags, tag];

    this.applyFilters();
  }

  isTechTagSelected(tag: string): boolean {
    return this.selectedTechTags.includes(tag);
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  clearTechTagFilter(): void {
    this.selectedTechTags = [];
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedTags = [];
    this.selectedTechTags = [];
    this.jobs$ = this.allJobs$;
  }

  get shouldShowTags(): boolean {
    return this.showTags || this.hasActiveFilters;
  }

  get shouldShowTechTags(): boolean {
    return this.showTechTags || this.hasActiveFilters;
  }

  private get hasActiveFilters(): boolean {
    return this.selectedTags.length > 0 || this.selectedTechTags.length > 0;
  }

  private applyFilters(): void {
    const selectedSkills = this.selectedTags;
    const selectedTech = this.selectedTechTags;

    this.jobs$ = this.allJobs$.pipe(
      map((jobs) =>
        jobs.filter((job) => {
          const matchesSkills =
            selectedSkills.length === 0 ||
            (job.data.tags ?? []).some((jobTag) => selectedSkills.includes(jobTag));

          const matchesTech =
            selectedTech.length === 0 ||
            (job.data.techTags ?? []).some((jobTag) => selectedTech.includes(jobTag));

          return matchesSkills && matchesTech;
        })
      )
    );
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  clearTagFilter(): void {
    this.selectedTags = [];
    this.applyFilters();
  }
}

