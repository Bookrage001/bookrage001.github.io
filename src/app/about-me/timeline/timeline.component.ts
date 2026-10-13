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

interface LaneJob {
  key: string;
  job: JobItem;
  lane: number;
  color: string;
  startYear: number;
  endYear: number;
  // CSS grid-row span from the end-year row (top) down to the start-year row
  gridRow: string;
}

interface TimelineRow {
  year: number;
  gridRow: number;
  // Jobs whose bar starts (at the top) in this row, i.e. ended this year
  jobs: LaneJob[];
  certs: TimelineCert[];
}

interface TimelineModel {
  rows: TimelineRow[];
  jobs: LaneJob[];
  laneCount: number;
  axisColumn: number;
  gridTemplateColumns: string;
}

// Adjacent lanes get different colours so concurrent roles are easy to tell apart.
const LANE_COLORS = ['#0b63c9', '#7b4bd1', '#0e8a8a', '#d9822b', '#c2417a', '#4a6a8a', '#6b8e23'];
const HEADER_ROWS = 1;

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

  // One grid row per year (newest first). Each job is a bar in its own lane
  // spanning the years it ran, or a dot when it sits inside a single year.
  // Certifications are dots on the year axis.
  readonly model$: Observable<TimelineModel> = combineLatest([
    this.jobService.getAds(),
    this.certsSubject
  ]).pipe(
    map(([jobs, certs]) => this.buildModel(jobs, certs))
  );

  hoveredJobKey: string | null = null;

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

  setHoveredJob(key: string | null): void {
    this.hoveredJobKey = key;
  }

  private buildModel(jobs: JobItem[], certs: CertItem[]): TimelineModel {
    const datedCerts = certs.filter(c => c.issuedDate);
    const laneJobs = this.assignLanes(jobs);

    const years = [
      ...laneJobs.flatMap(j => [j.startYear, j.endYear]),
      ...datedCerts.map(c => c.issuedDate!.getFullYear())
    ];
    const maxYear = Math.max(...years);
    const minYear = Math.min(...years);
    const gridRowFor = (year: number): number => maxYear - year + 1 + HEADER_ROWS;
    for (const lj of laneJobs) {
      lj.gridRow = `${gridRowFor(lj.endYear)} / ${gridRowFor(lj.startYear) + 1}`;
    }

    // Every year gets a row, even empty ones, so bars run continuously.
    const rows: TimelineRow[] = [];
    for (let year = maxYear; year >= minYear; year--) {
      rows.push({
        year,
        gridRow: gridRowFor(year),
        jobs: laneJobs.filter(j => j.endYear === year).sort((a, b) => a.lane - b.lane),
        certs: datedCerts
          .filter(c => c.issuedDate!.getFullYear() === year)
          .sort((a, b) => b.issuedDate!.getTime() - a.issuedDate!.getTime())
          .map(cert => ({ cert, during: this.getRolesHeldOn(jobs, cert.issuedDate!) }))
      });
    }

    const laneCount = Math.max(1, ...laneJobs.map(j => j.lane + 1));
    return {
      rows,
      jobs: laneJobs,
      laneCount,
      axisColumn: laneCount + 2,
      gridTemplateColumns: `minmax(0, 1fr) repeat(${laneCount}, 14px) 4.5rem minmax(0, 1fr)`
    };
  }

  // Greedy interval colouring at year granularity: a job reuses the first lane
  // whose previous job finished in an earlier year, so bars never share a row.
  private assignLanes(jobs: JobItem[]): LaneJob[] {
    const laneEndYears: number[] = [];
    return [...jobs]
      .sort((a, b) => new Date(a.data.startDate).getTime() - new Date(b.data.startDate).getTime())
      .map(job => {
        const startYear = new Date(job.data.startDate).getFullYear();
        const endYear = (job.data.endDate ? new Date(job.data.endDate) : new Date()).getFullYear();
        let lane = laneEndYears.findIndex(end => end < startYear);
        if (lane === -1) {
          lane = laneEndYears.length;
        }
        laneEndYears[lane] = endYear;
        return {
          key: `${job.data.role}-${job.data.company}-${job.data.startDate}`,
          job,
          lane,
          color: LANE_COLORS[lane % LANE_COLORS.length],
          startYear,
          endYear,
          gridRow: ''
        };
      });
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
