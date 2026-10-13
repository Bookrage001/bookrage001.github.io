import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { JobItem } from '../jobs/job-item';
import { CertItem } from './cert-item.interface';
import { MilestoneItem } from './milestone-item.interface';

interface LaneJob {
  key: string;
  job: JobItem;
  lane: number;
  // Lanes sitting between this role's card and its own lane, for the connector width
  laneOffset: number;
  gridColumn: number;
  color: string;
  isDot: boolean;
  // Grid row holding this job's card, inside the slice the job started in
  cardRow: number;
  // Bar: from the top of the slice the job ended in down to its card's row; a dot sits on the card's row
  barRow: string;
}

// A slice of time: a calendar year, or part of one when a milestone falls inside
// it (e.g. 2022 before and after moving to the UK). It gets one grid row per job
// card that starts in it, so every bar can end exactly at its own card.
interface SliceEntry {
  kind: 'slice';
  key: string;
  year: number;
  firstRow: number;
  // CSS grid-row span covering all of the slice's rows, for the year pill and certifications
  gridRows: string;
  isEmpty: boolean;
  // Roles that started during this slice (the bottom of their bar): jobs left of
  // the axis, volunteering right of it above the certifications
  jobs: LaneJob[];
  volunteers: LaneJob[];
  certs: CertItem[];
  certsRows: string;
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
  rightColumn: number;
  volunteerLaneCount: number;
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
const VOLUNTEER_COLORS = ['#b7791f', '#8d6e63', '#a0522d'];
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
    for (let i = 0; i < sortedBoundaries.length - 1; i++) {
      const end = sortedBoundaries[i];
      const start = sortedBoundaries[i + 1];
      const entry: SliceEntry = {
        kind: 'slice',
        key: `slice-${start}`,
        year: new Date(start).getFullYear(),
        firstRow: 0,
        gridRows: '',
        isEmpty: true,
        jobs: [],
        volunteers: [],
        certs: [],
        certsRows: ''
      };
      entries.push(entry);
      slices.push({ start, end, entry });

      const milestone = milestoneByTime.get(start);
      if (milestone) {
        entries.push({ kind: 'milestone', key: `milestone-${start}`, milestone, gridRow: 0 });
      }
    }

    const sliceAt = (time: number): Slice =>
      slices.find(s => s.start <= time && time < s.end) ?? (time < slices[slices.length - 1].start ? slices[slices.length - 1] : slices[0]);

    const laneJobs: LaneJob[] = jobs.map(job => {
      const laneJob: LaneJob = {
        key: `${job.data.role}-${job.data.company}-${job.data.startDate}`,
        job,
        lane: 0,
        laneOffset: 0,
        gridColumn: 0,
        color: '',
        isDot: sliceAt(startOf(job)) === sliceAt(endOf(job)),
        cardRow: 0,
        barRow: ''
      };
      const entry = sliceAt(startOf(job)).entry;
      (job.data.isVolunteer ? entry.volunteers : entry.jobs).push(laneJob);
      return laneJob;
    });

    for (const cert of [...datedCerts].sort((a, b) => b.issuedDate!.getTime() - a.issuedDate!.getTime())) {
      sliceAt(cert.issuedDate!.getTime()).entry.certs.push(cert);
    }

    // Lay out grid rows top to bottom: one per milestone, and per slice enough rows
    // for one job card each on the left and, on the right, one volunteering card
    // each followed by a row for the certifications. Newest start first.
    let gridRow = HEADER_ROWS + 1;
    for (const entry of entries) {
      if (entry.kind === 'milestone') {
        entry.gridRow = gridRow++;
        continue;
      }
      const newestFirst = (a: LaneJob, b: LaneJob): number =>
        startOf(b.job) - startOf(a.job) || endOf(b.job) - endOf(a.job);
      entry.jobs.sort(newestFirst);
      entry.volunteers.sort(newestFirst);
      entry.isEmpty = !entry.jobs.length && !entry.volunteers.length && !entry.certs.length;
      entry.firstRow = gridRow;
      entry.jobs.forEach((lj, index) => lj.cardRow = entry.firstRow + index);
      entry.volunteers.forEach((lj, index) => lj.cardRow = entry.firstRow + index);
      const rightRows = entry.volunteers.length + (entry.certs.length ? 1 : 0);
      gridRow += Math.max(1, entry.jobs.length, rightRows);
      entry.gridRows = `${entry.firstRow} / ${gridRow}`;
      entry.certsRows = `${entry.firstRow + entry.volunteers.length} / ${gridRow}`;
    }

    const isVolunteer = (lj: LaneJob): boolean => !!lj.job.data.isVolunteer;
    const jobLaneCount = Math.max(1, this.assignLanes(laneJobs.filter(lj => !isVolunteer(lj)), LANE_COLORS, sliceAt, startOf, endOf));
    const volunteerLaneCount = this.assignLanes(laneJobs.filter(isVolunteer), VOLUNTEER_COLORS, sliceAt, startOf, endOf);

    // Columns: job cards | job lanes | axis | volunteer lanes | volunteering + certifications.
    // laneOffset counts the lanes between a card and its own lane: job lanes number
    // outward from the job cards, volunteer lanes outward from the axis.
    const axisColumn = jobLaneCount + 2;
    for (const lj of laneJobs) {
      if (isVolunteer(lj)) {
        lj.gridColumn = axisColumn + 1 + lj.lane;
        lj.laneOffset = volunteerLaneCount - 1 - lj.lane;
      } else {
        lj.gridColumn = lj.lane + 2;
        lj.laneOffset = lj.lane;
      }
    }

    const volunteerLanes = volunteerLaneCount ? `repeat(${volunteerLaneCount}, 14px) ` : '';
    return {
      entries,
      jobs: laneJobs,
      axisColumn,
      rightColumn: axisColumn + volunteerLaneCount + 1,
      volunteerLaneCount,
      axisRows: `${HEADER_ROWS + 1} / ${gridRow}`,
      gridTemplateColumns: `minmax(0, 1fr) repeat(${jobLaneCount}, 14px) 4.5rem ${volunteerLanes}minmax(0, 1fr)`
    };
  }

  // Greedy interval colouring over grid rows: a role reuses the first lane whose
  // previous bar sits entirely below it, so bars never share a row. Returns the lane count.
  private assignLanes(
    laneJobs: LaneJob[],
    colors: string[],
    sliceAt: (time: number) => Slice,
    startOf: (job: JobItem) => number,
    endOf: (job: JobItem) => number
  ): number {
    const laneTopRows: number[] = [];
    for (const lj of [...laneJobs].sort((a, b) => startOf(a.job) - startOf(b.job))) {
      const topRow = lj.isDot ? lj.cardRow : sliceAt(endOf(lj.job)).entry.firstRow;
      let lane = laneTopRows.findIndex(laneTop => lj.cardRow < laneTop);
      if (lane === -1) {
        lane = laneTopRows.length;
      }
      laneTopRows[lane] = topRow;
      lj.lane = lane;
      lj.color = colors[lane % colors.length];
      lj.barRow = lj.isDot ? `${lj.cardRow}` : `${topRow} / ${lj.cardRow}`;
    }
    return laneTopRows.length;
  }
}
