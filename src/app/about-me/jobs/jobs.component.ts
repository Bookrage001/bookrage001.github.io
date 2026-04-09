import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
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
export class JobsComponent implements OnChanges {
    @Input() roleFocus: 'all' | 'business' | 'software' = 'all';
    @Output() roleFocusChange = new EventEmitter<'all' | 'business' | 'software'>();

  private readonly importantTerms = [
    'Full Stack Development',
    'Backend Development',
    'Frontend Development',
    'Node.js',
    'typeScript',
    'JavaScript',
    'Python',
    'C#',
    'RESTful APIs',
    'GraphQL',
    'Microservices',
    'Cloud Platforms',
    'AWS',
    'Azure',
    'GCP',
    'Infrastructure as Code',
    'CloudFormation',
    'Serverless',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Automation',
    'Testing (Unit, Integration, E2E)',
    'SQL',
    'Relational Databases',
    'NoSQL Databases',
    'Large Datasets',
    'System Architecture',
    'Scalability',
    'Real-time Systems',
    'WebSockets',
    'MQTT',
    'Networking',
    'Network Troubleshooting',
    'LAN',
    'LAN Support',
    'VPN',
    'Telecommunication',
    'PowerShell',
    ' IT',
    ' ICT ',
    ' MacOS ',
    ' Windows ',
    ' Linux ',
    'Requirements Gathering',
    'User Stories',
    'Backlog Grooming',
    'Sprint Planning',
    'Agile Delivery',
    'Scrum',
    'Stakeholder Engagement',
    'Cross-functional Collaboration',
    'Solution Design',
    'UX Alignment',
    'Documentation',
    'Traceability',
    'Product Development',
    'Roadmapping',
    'Prioritisation',
    'Technology Transformation',
    'Digital Transformation',
    'Business Analyst',
    'Business Analysis',
    'Problem Solving',
    'Client Engagement',
    'Workshops',
    'Discovery Sessions',
    'Strategic Thinking',
    'Enterprise Architecture',
    'Operating Models',
    'Process Improvement',
    'Digital Health',
    'Enterprise SaaS',
    'Risk Management',
    'Maritime Logistics',
    'IoT',
    'AI/ML Integration',
    'Expense Automation',
    'Mission-critical Systems',
    'Communication',
    'Analytical Thinking',
    'Collaboration',
    'Proactive Mindset',
    'Curiosity',
    'Adaptability',
    'Attention to Detail',
    'User-centric Thinking'
  ];

  private readonly importantTermsRegex = this.buildImportantTermsRegex();

  private readonly businessFocusTags = [
    'Stakeholder Management',
    'Workflow Analysis',
    'Communication',
    'Project Delivery',
    'Problem Solving',
    'User-Centered Design',
    'Continuous Improvement'
  ];

  private readonly softwareFocusTags = [
    'Full Stack Development',
    'Automation',
    'Security',
    'Cloud Architecture',
    'Identity Management',
    'Enterprise IT'
  ];

  allJobs$: Observable<JobItem[]>;
  jobs$: Observable<JobItem[]>;
  tags$: Observable<string[]>;
  techTags$: Observable<string[]>;
  selectedTags: string[] = [];
  selectedTechTags: string[] = [];
  activeFocus: 'all' | 'business' | 'software' = 'all';
  lastFiveYearsOnly = true;
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

    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['roleFocus']) {
      return;
    }

    if (this.roleFocus === 'business' && this.activeFocus !== 'business') {
      this.applyBusinessFocus(false);
      return;
    }

    if (this.roleFocus === 'software' && this.activeFocus !== 'software') {
      this.applySoftwareFocus(false);
      return;
    }

    if (this.roleFocus === 'all' && this.activeFocus !== 'all') {
      this.clearRoleFocus(false);
    }
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
    this.activeFocus = 'all';
    this.selectedTags = [];
    this.selectedTechTags = [];
    this.lastFiveYearsOnly = false;
    this.applyFilters();
  }

  applyBusinessFocus(emitChange = true): void {
    this.activeFocus = 'business';
    this.selectedTags = [...this.businessFocusTags];
    this.selectedTechTags = [];
    this.showTags = true;
    this.showTechTags = false;
    this.lastFiveYearsOnly = false;
    if (emitChange) {
      this.roleFocusChange.emit(this.activeFocus);
    }
    this.applyFilters();
  }

  applySoftwareFocus(emitChange = true): void {
    this.activeFocus = 'software';
    this.selectedTags = [...this.softwareFocusTags];
    this.selectedTechTags = [];
    this.showTags = true;
    this.showTechTags = true;
    this.lastFiveYearsOnly = false;
    if (emitChange) {
      this.roleFocusChange.emit(this.activeFocus);
    }
    this.applyFilters();
  }

  clearRoleFocus(emitChange = true): void {
    this.activeFocus = 'all';
    this.selectedTags = [];
    this.selectedTechTags = [];
    this.showTags = false;
    this.showTechTags = false;
    this.lastFiveYearsOnly = true;
    if (emitChange) {
      this.roleFocusChange.emit(this.activeFocus);
    }
    this.applyFilters();
  }

  onLastFiveYearsChange(): void {
    this.lastFiveYearsOnly = !this.lastFiveYearsOnly;
    this.applyFilters();
  }

  get shouldShowTags(): boolean {
    return this.showTags || this.hasSelectedSkillFilters;
  }

  get shouldShowTechTags(): boolean {
    return this.showTechTags || this.hasSelectedTechFilters;
  }

  private get hasSelectedSkillFilters(): boolean {
    return this.selectedTags.length > 0;
  }

  private get hasSelectedTechFilters(): boolean {
    return this.selectedTechTags.length > 0;
  }

  private applyFilters(): void {
    const selectedSkills = this.selectedTags;
    const selectedTech = this.selectedTechTags;
    const fiveYearsCutoff = new Date();
    fiveYearsCutoff.setFullYear(fiveYearsCutoff.getFullYear() - 5);
    fiveYearsCutoff.setHours(0, 0, 0, 0);

    this.jobs$ = this.allJobs$.pipe(
      map((jobs) =>
        jobs.filter((job) => {
          const matchesLastFiveYears =
            !this.lastFiveYearsOnly ||
            !job.data.endDate ||
            job.data.endDate >= fiveYearsCutoff;

          return this.matchesSelectedFilters(job, selectedSkills, selectedTech) && matchesLastFiveYears;
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

  getDescriptions(job: JobItem): string[] {
    if (this.activeFocus === 'business' && job.data.businessDescription?.length) {
      return job.data.businessDescription;
    }

    if (this.activeFocus === 'software' && job.data.softwareDescription?.length) {
      return job.data.softwareDescription;
    }

    return job.data.description;
  }

  getDurationLabel(startDate: Date, endDate?: Date): string {
    return this.formatDurationLabel(this.getDurationInMonths(startDate, endDate));
  }

  private matchesSelectedFilters(job: JobItem, selectedSkills: string[], selectedTech: string[]): boolean {
    const matchesSkills =
      selectedSkills.length === 0 ||
      (job.data.tags ?? []).some((jobTag) => selectedSkills.includes(jobTag));

    const matchesTech =
      selectedTech.length === 0 ||
      (job.data.techTags ?? []).some((jobTag) => selectedTech.includes(jobTag));

    return matchesSkills && matchesTech;
  }

  private getDurationInMonths(startDate: Date, endDate?: Date): number {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return 0;
    }

    let totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    // Count the current month when the end day is on/after the start day.
    if (end.getDate() >= start.getDate()) {
      totalMonths += 1;
    }

    return Math.max(totalMonths, 1);
  }

  private formatDurationLabel(totalMonths: number): string {
    if (totalMonths <= 0) {
      return '0 mo';
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
      return `${years} yr ${months} mo`;
    }

    if (years > 0) {
      return `${years} yr`;
    }

    return `${months} mo`;
  }

  highlightImportantWords(text: string): string {
    const safeText = this.escapeHtml(text);
    return safeText.replace(this.importantTermsRegex, '<strong class="important-word">$1</strong>');
  }

  private buildImportantTermsRegex(): RegExp {
    const escapedTerms = this.importantTerms
      .slice()
      .sort((a, b) => b.length - a.length)
      .map((term) => this.escapeRegex(term));

    return new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

