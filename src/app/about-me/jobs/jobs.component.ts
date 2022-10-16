import { Component, Injectable, OnInit } from '@angular/core';
import { JobItem } from './job-item';
import { JobService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: JobItem[] = [];

  constructor(
    private jobservice: JobService
  ) { }

  ngOnInit() {
    this.jobs = this.jobservice.getAds();
  }

}

