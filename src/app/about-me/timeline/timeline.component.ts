import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { JobItem } from '../jobs/job-item';
import { CertItem } from './cert-item.interface';

interface TimelineCert {
  cert: CertItem;
  // Roles held when the certification was issued, e.g. "Software Engineer · Windracers (UK)"
  during: string[];
}

interface TimelineRow {
  year: number;
  jobs: JobItem[];
  // Roles that started in an earlier year and were still running in this one
  continuing: JobItem[];
  certs: TimelineCert[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TimelineComponent {
  private readonly jobService = inject(JobService);
  private readonly certsSubject = new BehaviorSubject<CertItem[]>([]);

  @Input() set certs(value: CertItem[]) {
    this.certsSubject.next(value);
  }

  // One row per year on a shared spine: jobs that started that year on the
  // left, certifications issued that year on the right.
  readonly rows$: Observable<TimelineRow[]> = combineLatest([
    this.jobService.getAds(),
    this.certsSubject
  ]).pipe(
    map(([jobs, certs]) => this.buildRows(jobs, certs))
  );

  readonly undatedCerts$: Observable<CertItem[]> = this.certsSubject.pipe(
    map(certs => certs.filter(c => !c.issuedDate))
  );

  getDateRangeLabel(job: JobItem): string {
    const fmt = (d: Date): string =>
      new Date(d).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
    const end = job.data.endDate ? fmt(job.data.endDate) : 'Present';
    return `${fmt(job.data.startDate)} – ${end}`;
  }

  getDurationLabel(startDate: Date, endDate?: Date): string {
    const totalMonths = this.getDurationInMonths(startDate, endDate);
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

  private getDurationInMonths(startDate: Date, endDate?: Date): number {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return 0;
    }

    let totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (end.getDate() >= start.getDate()) {
      totalMonths += 1;
    }

    return Math.max(totalMonths, 1);
  }

  private buildRows(jobs: JobItem[], certs: CertItem[]): TimelineRow[] {
    const rowMap = new Map<number, TimelineRow>();
    const rowFor = (year: number): TimelineRow => {
      if (!rowMap.has(year)) rowMap.set(year, { year, jobs: [], continuing: [], certs: [] });
      return rowMap.get(year)!;
    };

    for (const job of jobs) {
      rowFor(new Date(job.data.startDate).getFullYear()).jobs.push(job);
    }

    for (const cert of certs.filter(c => c.issuedDate)) {
      rowFor(cert.issuedDate!.getFullYear()).certs.push({
        cert,
        during: this.getRolesHeldOn(jobs, cert.issuedDate!)
      });
    }

    const startTime = (job: JobItem): number => new Date(job.data.startDate).getTime();
    const rows = Array.from(rowMap.values()).sort((a, b) => b.year - a.year);
    for (const row of rows) {
      row.continuing = jobs
        .filter(job => {
          const startYear = new Date(job.data.startDate).getFullYear();
          const endYear = (job.data.endDate ? new Date(job.data.endDate) : new Date()).getFullYear();
          return startYear < row.year && row.year <= endYear;
        })
        .sort((a, b) => startTime(b) - startTime(a));
      row.jobs.sort((a, b) => startTime(b) - startTime(a));
      row.certs.sort((a, b) => b.cert.issuedDate!.getTime() - a.cert.issuedDate!.getTime());
    }
    return rows;
  }

  private getRolesHeldOn(jobs: JobItem[], date: Date): string[] {
    const time = date.getTime();
    return jobs
      .filter(job => {
        const start = new Date(job.data.startDate).getTime();
        const end = job.data.endDate ? new Date(job.data.endDate).getTime() : Date.now();
        return start <= time && time <= end;
      })
      .sort((a, b) => new Date(b.data.startDate).getTime() - new Date(a.data.startDate).getTime())
      .map(job => `${job.data.role} · ${job.data.company}`);
  }
}
