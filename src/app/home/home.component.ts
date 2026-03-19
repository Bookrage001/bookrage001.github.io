import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface HomeProjectHighlight {
  title: string;
  timeframe: string;
  summary: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomeComponent {
  readonly featuredProjects: HomeProjectHighlight[] = [
    {
      title: 'Windracers Distributed Control Application',
      timeframe: '2023-2026',
      summary: 'Mission software, distributed services, UX improvements, and delivery practices built around operator outcomes in a complex engineering environment.',
      route: '/products/distributed-avionics'
    },
    {
      title: 'Assertive Platform Delivery',
      timeframe: '2018-2021',
      summary: 'Full-stack feature delivery across Angular, TypeScript, Node.js, authentication, automation, AWS, and customer-facing improvements.',
      route: '/products/assertive'
    },
    {
      title: 'Life is a Mystree',
      timeframe: 'Creative product work',
      summary: 'A product and game build that shows design thinking, experimentation, and the ability to turn ideas into something tangible.',
      route: '/products/life-mystree'
    }
  ];
}
