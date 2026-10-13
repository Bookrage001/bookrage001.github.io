import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { JobItem } from '../jobs/job-item';
import { CertItem } from './cert-item.interface';
import { MilestoneItem } from './milestone-item.interface';

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
  isDot: boolean;
  // CSS grid-row span from the slice the job ended in (top) down to the one it started in
  gridRow: string;
}

// A slice of time shown as one grid row: a calendar year, or part of one when
// a milestone falls inside it (e.g. 2022 before and after moving to the UK).
interface SliceEntry {
  kind: 'slice';
  key: string;
  year: number;
  gridRow: number;
  isEmpty: boolean;
  // Jobs that started during this slice (the bottom of their bar)
  jobs: LaneJob[];
  certs: TimelineCert[];
}

interface MilestoneEntry {
  kind: 'milestone';
  key: string;
  milestone: MilestoneItem;
  gridRow: number;
}

type TimelineEntry = SliceEntry | MilestoneEntry;

interface TimelineModel {
  // Newest first; DOM order doubles as the mobile stacking order
  entries: TimelineEntry[];
  jobs: LaneJob[];
  axisColumn: number;
  axisRows: string;
  gridTemplateColumns: string;
}

interface Slice {
  start: number;
  end: number;
  entry: SliceEntry;
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
  private readonly milestonesSubject = new BehaviorSubject<MilestoneItem[]>([]);

  @Input() set certs(value: CertItem[]) {
    this.certsSubject.next(value);
  }

  @Input() set milestones(value: MilestoneItem[]) {
    this.milestonesSubject.next(value);
  }

  // One grid row per year (newest first), split at milestones. Each job is a
  // bar in its own lane spanning the rows it ran through, or a dot when it sits
  // inside a single row. Certifications are dots on the year axis.
  readonly model$: Observable<TimelineModel> = combineLatest([
    this.jobService.getAds(),
    this.certsSubject,
    this.milestonesSubject
  ]).pipe(
    map(([jobs, certs, milestones]) => this.buildModel(jobs, certs, milestones))
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

  private buildModel(jobs: JobItem[], certs: CertItem[], milestones: MilestoneItem[]): TimelineModel {
    const datedCerts = certs.filter(c => c.issuedDate);
    const startOf = (job: JobItem): number => new Date(job.data.startDate).getTime();
    const endOf = (job: JobItem): number =>
      (job.data.endDate ? new Date(job.data.endDate) : new Date()).getTime();

    const times = [
      ...jobs.flatMap(job => [startOf(job), endOf(job)]),
      ...datedCerts.map(c => c.issuedDate!.getTime())
    ];
    const minYear = new Date(Math.min(...times)).getFullYear();
    const maxYear = new Date(Math.max(...times)).getFullYear();

    // Slice boundaries: every 1 Jan in range plus each milestone date, newest first.
    const milestoneByTime = new Map<number, MilestoneItem>();
    for (const m of milestones) {
      const year = m.date.getFullYear();
      if (year >= minYear && year <= maxYear) {
        milestoneByTime.set(m.date.getTime(), m);
      }
    }
    const boundaries = new Set<number>(milestoneByTime.keys());
    for (let year = minYear; year <= maxYear + 1; year++) {
      boundaries.add(new Date(year, 0, 1).getTime());
    }
    const sortedBoundaries = [...boundaries].sort((a, b) => b - a);

    const entries: TimelineEntry[] = [];
    const slices: Slice[] = [];
    let gridRow = HEADER_ROWS + 1;
    for (let i = 0; i < sortedBoundaries.length - 1; i++) {
      const end = sortedBoundaries[i];
      const start = sortedBoundaries[i + 1];
      const entry: SliceEntry = {
        kind: 'slice',
        key: `slice-${start}`,
        year: new Date(start).getFullYear(),
        gridRow: gridRow++,
        isEmpty: true,
        jobs: [],
        certs: []
      };
      entries.push(entry);
      slices.push({ start, end, entry });

      const milestone = milestoneByTime.get(start);
      if (milestone) {
        entries.push({ kind: 'milestone', key: `milestone-${start}`, milestone, gridRow: gridRow++ });
      }
    }

    const sliceAt = (time: number): Slice =>
      slices.find(s => s.start <= time && time < s.end) ?? (time < slices[slices.length - 1].start ? slices[slices.length - 1] : slices[0]);

    // Greedy interval colouring over grid rows: a job reuses the first lane whose
    // previous bar sits entirely below it, so bars never share a row.
    const laneTopRows: number[] = [];
    const laneJobs: LaneJob[] = [...jobs]
      .sort((a, b) => startOf(a) - startOf(b))
      .map(job => {
        const top = sliceAt(endOf(job)).entry;
        const bottom = sliceAt(startOf(job)).entry;
        let lane = laneTopRows.findIndex(laneTop => bottom.gridRow < laneTop);
        if (lane === -1) {
          lane = laneTopRows.length;
        }
        laneTopRows[lane] = top.gridRow;

        const laneJob: LaneJob = {
          key: `${job.data.role}-${job.data.company}-${job.data.startDate}`,
          job,
          lane,
          color: LANE_COLORS[lane % LANE_COLORS.length],
          isDot: top === bottom,
          gridRow: `${top.gridRow} / ${bottom.gridRow + 1}`
        };
        bottom.jobs.push(laneJob);
        return laneJob;
      });

    for (const cert of [...datedCerts].sort((a, b) => b.issuedDate!.getTime() - a.issuedDate!.getTime())) {
      sliceAt(cert.issuedDate!.getTime()).entry.certs.push({
        cert,
        during: this.getRolesHeldOn(jobs, cert.issuedDate!)
      });
    }

    // Newest start first within a slice, matching the timeline's top-to-bottom order.
    for (const { entry } of slices) {
      entry.jobs.sort((a, b) => startOf(b.job) - startOf(a.job) || endOf(b.job) - endOf(a.job));
      entry.isEmpty = !entry.jobs.length && !entry.certs.length;
    }

    const laneCount = Math.max(1, laneTopRows.length);
    return {
      entries,
      jobs: laneJobs,
      axisColumn: laneCount + 2,
      axisRows: `${HEADER_ROWS + 1} / ${gridRow}`,
      gridTemplateColumns: `minmax(0, 1fr) repeat(${laneCount}, 14px) 4.5rem minmax(0, 1fr)`
    };
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
