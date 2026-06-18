import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { JobItem } from '../jobs/job-item';
import { CertItem } from './cert-item.interface';

interface TimelineRow {
  year: number;
  jobs: JobItem[];
  certs: CertItem[];
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

  readonly timelineRows$: Observable<TimelineRow[]> = combineLatest([
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

  private buildRows(jobs: JobItem[], certs: CertItem[]): TimelineRow[] {
    const rowMap = new Map<number, TimelineRow>();

    for (const job of jobs) {
      const year = new Date(job.data.startDate).getFullYear();
      if (!rowMap.has(year)) rowMap.set(year, { year, jobs: [], certs: [] });
      rowMap.get(year)!.jobs.push(job);
    }

    for (const cert of certs.filter(c => c.issuedDate)) {
      const year = cert.issuedDate!.getFullYear();
      if (!rowMap.has(year)) rowMap.set(year, { year, jobs: [], certs: [] });
      rowMap.get(year)!.certs.push(cert);
    }

    return Array.from(rowMap.values()).sort((a, b) => b.year - a.year);
  }
}
