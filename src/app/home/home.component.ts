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
      summary: 'Product delivery in a complex operational setting, balancing operator needs, technical constraints, and roadmap priorities to improve usability and mission outcomes.',
      route: '/products/distributed-avionics'
    },
    {
      title: 'Assertive Platform Delivery',
      timeframe: '2018-2021',
      summary: 'Cross-functional platform work focused on shaping features, improving customer-facing journeys, and aligning delivery with product and business priorities.',
      route: '/products/assertive'
    },
    {
      title: 'Life is a Mystree',
      timeframe: 'Creative product work',
      summary: 'An experimental build that demonstrates idea validation, iterative design, and the discipline of turning concepts into a coherent product experience.',
      route: '/products/life-mystree'
    }
  ];
}
