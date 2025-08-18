import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobsComponent } from './jobs/jobs.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FlexLayoutModule,
    JobsComponent
  ]
})
export class AboutMeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
