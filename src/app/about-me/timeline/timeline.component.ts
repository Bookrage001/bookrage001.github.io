import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { JobItem } from '../jobs/job-item';
import { CertItem } from './cert-item.interface';

interface CertTimelineRow {
  year: number;
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

  readonly jobs$: Observable<JobItem[]> = this.jobService.getAds().pipe(
    map((jobs) =>
      [...jobs].sort(
        (a, b) =>
          new Date(b.data.startDate).getTime() -
          new Date(a.data.startDate).getTime()
      )
    )
  );

  readonly certRows$: Observable<CertTimelineRow[]> = this.certsSubject.pipe(
    map(certs => this.buildCertRows(certs))
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

  private buildCertRows(certs: CertItem[]): CertTimelineRow[] {
    const rowMap = new Map<number, CertTimelineRow>();

    for (const cert of certs.filter(c => c.issuedDate)) {
      const year = cert.issuedDate!.getFullYear();
      if (!rowMap.has(year)) rowMap.set(year, { year, certs: [] });
      rowMap.get(year)!.certs.push(cert);
    }

    return Array.from(rowMap.values()).sort((a, b) => b.year - a.year);
  }
}
