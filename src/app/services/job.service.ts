import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobItem } from '../about-me/jobs/job-item';
import { Observable, map } from 'rxjs';

interface JobJsonItem {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string[];
  businessDescription?: string[];
  softwareDescription?: string[];
  tags?: string[];
  techTags?: string[];
}

interface JobsResponse {
  data: JobJsonItem[];
  lastEdited: Date;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly http = inject(HttpClient);

  getAds(): Observable<JobItem[]> {
    return this.http.get<JobsResponse>('/app/services/jobs.json').pipe(
      map((response) =>
        response.data.map(
          (item) =>
            new JobItem({
              role: item.role,
              company: item.company,
              startDate: new Date(item.startDate),
              endDate: item.endDate ? new Date(item.endDate) : undefined,
              description: item.description,
              businessDescription: item.businessDescription,
              softwareDescription: item.softwareDescription,
              tags: item.tags,
              techTags: item.techTags
            })
        )
      )
    );
  }
}


