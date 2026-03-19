import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  isSameMonth,
  format,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths,
  subWeeks,
  addWeeks,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  DateAdapter,
  provideCalendar,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from 'src/environments/environment';

interface EventColor { primary: string; secondary: string; }
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, FlexLayoutModule],
  providers: provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
})
export class CalenderComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<unknown>;

  private readonly http = inject(HttpClient);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  private readonly calendarIcsUrls = this.getCalendarIcsUrls();

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  get viewTitle(): string {
    switch (this.view) {
      case CalendarView.Month:
        return format(this.viewDate, 'MMMM yyyy');
      case CalendarView.Week: {
        const start = startOfWeek(this.viewDate);
        const end = endOfWeek(this.viewDate);
        return `${format(start, 'MMM d')} \u2013 ${format(end, 'MMM d, yyyy')}`;
      }
      case CalendarView.Day:
        return format(this.viewDate, 'MMMM d, yyyy');
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.loadEventsFromIcs();
  }

  ngAfterViewInit(): void {
    this.centerCurrentTimeMarker();
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<void> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = true;
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return { ...event, start: newStart, end: newEnd };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: { beforeStart: true, afterEnd: true },
      },
    ];
  }

  setView(view: CalendarView): void {
    this.view = view;
    this.centerCurrentTimeMarker();
  }

  navigatePrevious(): void {
    switch (this.view) {
      case CalendarView.Month: this.viewDate = subMonths(this.viewDate, 1); break;
      case CalendarView.Week:  this.viewDate = subWeeks(this.viewDate, 1);  break;
      case CalendarView.Day:   this.viewDate = subDays(this.viewDate, 1);   break;
    }
    this.closeOpenMonthViewDay();
    this.centerCurrentTimeMarker();
  }

  navigateNext(): void {
    switch (this.view) {
      case CalendarView.Month: this.viewDate = addMonths(this.viewDate, 1); break;
      case CalendarView.Week:  this.viewDate = addWeeks(this.viewDate, 1);  break;
      case CalendarView.Day:   this.viewDate = addDays(this.viewDate, 1);   break;
    }
    this.closeOpenMonthViewDay();
    this.centerCurrentTimeMarker();
  }

  navigateToday(): void {
    this.viewDate = new Date();
    this.closeOpenMonthViewDay();
    this.centerCurrentTimeMarker();
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  private loadEventsFromIcs(): void {
    if (this.calendarIcsUrls.length === 0) {
      return;
    }

    this.loadEventsFromIcsUrl(0);
  }

  private loadEventsFromIcsUrl(urlIndex: number): void {
    if (urlIndex >= this.calendarIcsUrls.length) {
      console.error('Failed to load ICS feed from all configured URLs');
      return;
    }

    const url = this.calendarIcsUrls[urlIndex];
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (icsText: string) => {
        const parsedEvents = this.parseIcsEvents(icsText);
        if (parsedEvents.length > 0) {
          this.events = parsedEvents;
          this.refresh.next();
          return;
        }

        this.loadEventsFromIcsUrl(urlIndex + 1);
      },
      error: (error) => {
        console.warn(`Failed to load ICS feed from ${url}`, error);
        this.loadEventsFromIcsUrl(urlIndex + 1);
      },
    });
  }

  private getCalendarIcsUrls(): string[] {
    const fromArray = (environment as { calendarIcsUrls?: string[] }).calendarIcsUrls;
    if (Array.isArray(fromArray) && fromArray.length > 0) {
      return fromArray.filter((url) => Boolean(url));
    }

    const fromSingle = (environment as { calendarIcsUrl?: string }).calendarIcsUrl;
    return fromSingle ? [fromSingle] : [];
  }

  private parseIcsEvents(icsText: string): CalendarEvent[] {
    const unfolded = icsText.replace(/\r?\n[ \t]/g, '');
    const lines = unfolded.split(/\r?\n/);
    const parsedEvents: CalendarEvent[] = [];

    let inEvent = false;
    let summary = '';
    let start: Date | null = null;
    let end: Date | null = null;
    let allDay = false;

    for (const line of lines) {
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        summary = '';
        start = null;
        end = null;
        allDay = false;
        continue;
      }

      if (line === 'END:VEVENT') {
        if (start) {
          parsedEvents.push({
            title: summary || 'Untitled Event',
            start,
            end: end ?? undefined,
            allDay,
            color: colors['blue'],
          });
        }
        inEvent = false;
        continue;
      }

      if (!inEvent) {
        continue;
      }

      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        continue;
      }

      const rawKey = line.slice(0, separatorIndex);
      const value = line.slice(separatorIndex + 1);
      const key = rawKey.split(';')[0];

      if (key === 'SUMMARY') {
        summary = this.unescapeIcsText(value);
      } else if (key === 'DTSTART') {
        allDay = rawKey.includes('VALUE=DATE') || /^\d{8}$/.test(value);
        start = this.parseIcsDate(value);
      } else if (key === 'DTEND') {
        end = this.parseIcsDate(value);
      }
    }

    return parsedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  private parseIcsDate(value: string): Date | null {
    const dateOnlyMatch = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const dateTimeMatch = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/.exec(value);
    if (!dateTimeMatch) {
      return null;
    }

    const [, year, month, day, hours, minutes, seconds, utcFlag] = dateTimeMatch;
    if (utcFlag === 'Z') {
      return new Date(Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds)
      ));
    }

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds)
    );
  }

  private unescapeIcsText(value: string): string {
    return value
      .replace(/\\n/g, '\n')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\\\/g, '\\');
  }

  private centerCurrentTimeMarker(): void {
    if (this.view === CalendarView.Month) {
      return;
    }

    setTimeout(() => {
      const host = this.hostElement.nativeElement;
      const timeContainer = host.querySelector('.cal-time-events') as HTMLElement | null;
      const marker = host.querySelector('.cal-current-time-marker') as HTMLElement | null;

      if (!timeContainer || !marker) {
        return;
      }

      const targetScrollTop = marker.offsetTop - (timeContainer.clientHeight / 2);
      timeContainer.scrollTop = Math.max(0, targetScrollTop);
    });
  }
}
