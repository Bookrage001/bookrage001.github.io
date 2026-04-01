import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface HomePainPoint {
  title: string;
  summary: string;
}

interface HomeSolution {
  title: string;
  summary: string;
}

interface HomeApproachStep {
  name: string;
  summary: string;
}

interface HomeCaseStudy {
  title: string;
  summary: string;
  outcome: string;
  route?: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class HomeComponent {
  readonly painPoints: HomePainPoint[] = [
    {
      title: 'Messy Workflows',
      summary: 'Critical tasks live across chat, inboxes, and spreadsheets, so ownership is unclear and work gets dropped.'
    },
    {
      title: 'Manual Admin Overload',
      summary: 'Teams spend hours on repeat data entry, status updates, and reconciliations that should be automated.'
    },
    {
      title: 'Tool Chaos',
      summary: 'Multiple apps do similar jobs, but none are connected, which creates duplication and confusion.'
    },
    {
      title: 'Inconsistent Delivery',
      summary: 'Without clear process standards, outcomes vary week to week and customer confidence drops.'
    }
  ];

  readonly solutions: HomeSolution[] = [
    {
      title: 'Workflow Audits',
      summary: 'Map how work actually moves today, then identify bottlenecks, delays, and handoff risks.'
    },
    {
      title: 'Systems Redesign',
      summary: 'Create clearer operating flows so teams know what to do, when to do it, and where to track it.'
    },
    {
      title: 'Automation & Integrations',
      summary: 'Connect tools and automate repeat tasks to reduce errors, save time, and speed up delivery.'
    },
    {
      title: 'Internal Tools, Documentation & Training',
      summary: 'Build practical tools, document the way of working, and train teams for reliable execution.'
    }
  ];

  readonly approach: HomeApproachStep[] = [
    {
      name: 'Discovery',
      summary: 'Free stage. Assess workflows, systems, and constraints to identify the highest-friction points first.'
    },
    {
      name: 'Validate',
      summary: 'Design and test with your team before build, including accessibility and usability checks, to prove value early.'
    },
    {
      name: 'Build',
      summary: 'Implement improvements through configuration, automation, integration, and lightweight tooling.'
    },
    {
      name: 'Collaborate',
      summary: 'Continue working together through support, shared ideas, and long-term operational improvement.'
    }
  ];

  readonly caseStudies: HomeCaseStudy[] = [
    {
      title: 'Life is a Mystree',
      summary: 'Took a concept from idea to working product through structured validation, iterative design, and practical implementation decisions.',
      outcome: 'Clearer product direction, stronger process discipline, and better decision quality during build.',
      route: '/products/life-mystree'
    },
    {
      title: 'Volunteer App',
      summary: 'Built and iterated a volunteer-focused application to make coordination, visibility, and day-to-day participation easier for community teams.',
      outcome: 'Improved volunteer experience with clearer workflows and a practical digital home for ongoing engagement.',
      route: '/products/volunteer-app'
    }
  ];
}
