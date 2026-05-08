import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { JobsComponent } from './jobs/jobs.component';
import { PrintService } from '../services/print.service';

type ResumeMode = 'full' | 'business' | 'technology' | 'hospitality';

interface ResumeSectionContent {
  summary: string;
  focusSections: {
    title: string;
    bullets: string[];
  }[];
  coreStrengths: string[];
  selectedOutcomes: string[];
}

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    JobsComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ]
})
export class AboutMeComponent {
  private printService = inject(PrintService);
  compactPrintMode = false;
  resumeMode: ResumeMode = 'business';

  private resumeContentByMode: Record<ResumeMode, ResumeSectionContent> = {
    full: {
      summary: 'Business-aligned product and delivery leader with a software engineering background. Experienced across product development, software delivery, and cross-functional stakeholder alignment. Identifies core business issues early and drives practical solutions that balance user needs, operational realities, and commercial outcomes.',
      focusSections: [
        {
          title: 'Product Development',
          bullets: [
            'Identified root causes of product and operational problems before committing to solutions.',
            'Structured ambiguous problems into clear, addressable priorities with defined success criteria.',
            'Partnered with stakeholders to validate problem framing and align on the right outcomes to pursue.'
          ]
        },
        {
          title: 'Software Delivery',
          bullets: [
            'Led end-to-end delivery across planning, build, rollout, and post-release follow-up.',
            'Shipped across Angular, TypeScript, Node.js, .NET, AWS, and CI/CD-based workflows.',
            'Applied technical depth to de-risk delivery and maintain alignment with product intent.'
          ]
        }
      ],
      coreStrengths: [
        'Business alignment across strategy, delivery priorities, and stakeholder decision-making',
        'Product thinking grounded in user needs, operational context, and business priorities',
        'Cross-functional leadership across engineering, operations, IT, and stakeholder groups',
        'Prioritisation and delivery management balancing scope, risk, constraints, and value',
        'Communication that converts technical complexity into aligned decisions and clear execution'
      ],
      selectedOutcomes: [
        'Shaped and delivered improvements in complex environments where usability, reliability, and mission outcomes all matter',
        'Aligned technical and non-technical stakeholders around delivery decisions tied to business and customer needs',
        'Drove platform improvements that reduced friction and strengthened day-to-day product experience',
        'Brought technical depth into prioritisation discussions to support practical, high-confidence decisions',
        'Led delivery from problem framing through rollout, iteration, and follow-up'
      ]
    },
    business: {
      summary: 'Business analyst and delivery lead with core strength in business alignment. Experienced in identifying root business issues, translating complex requirements into clear priorities, and leading aligned execution across technical and non-technical stakeholders.',
      focusSections: [
        {
          title: 'Business Analysis and Discovery',
          bullets: [
            'Elicited requirements through workshops, stakeholder interviews, and iterative discovery sessions.',
            'Produced user stories, acceptance criteria, process maps, and decision-ready trade-off documentation.',
            'Led alignment between technical and business teams by applying engineering knowledge to requirements analysis.',
            'Mapped as-is and to-be workflows to reduce ambiguity and accelerate delivery readiness.'
          ]
        },
        {
          title: 'Delivery and Stakeholder Alignment',
          bullets: [
            'Backlog and roadmap prioritisation based on business value, risk, and operational constraints.',
            'Directed alignment across engineering, operations, and leadership throughout the delivery cycle.',
            'Managed rollout readiness through change communication, traceability, and stakeholder engagement.',
            'Kept customer outcomes visible in delivery decisions from discovery through to release.'
          ]
        }
      ],
      coreStrengths: [
        'Senior business alignment leadership across problem framing, delivery sequencing, and measurable outcomes',
        'Executive-ready stakeholder alignment across technical, operational, and commercial priorities',
        'Requirements management and backlog prioritisation across Agile and hybrid delivery models',
        'Stakeholder engagement across technical, operational, and executive audiences',
        'Process improvement grounded in data, operational context, and user research',
        'Communication that accelerates decision-making and reduces delivery ambiguity',
        'Delivery discipline that keeps scope, value, and customer outcomes consistently aligned'
      ],
      selectedOutcomes: [
        'Led cross-functional business alignment to keep product scope, sequencing, and delivery outcomes commercially focused',
        'Improved alignment between product scope and business outcomes across cross-functional teams',
        'Reduced delivery risk by resolving requirements ambiguity, dependencies, and rollout gaps early',
        'Strengthened stakeholder confidence through transparent planning and consistent communication',
        'Enabled iterative delivery cycles by balancing strategic goals with practical constraints',
      ]
    },
    technology: {
      summary: 'Senior software engineer and technical delivery lead with strengths in solution implementation, platform delivery, and production reliability. Known for leading technical execution against business priorities while shipping dependable outcomes in modern web stacks and mission-critical operational environments.',
      focusSections: [
        {
          title: 'Solution Engineering and Delivery',
          bullets: [
            'Led implementation of scalable features across frontend, backend, and integration layers.',
            'Guided solution design decisions that balanced maintainability, delivery speed, and reliability.',
            'Established automated test coverage and CI/CD pipelines to reduce regressions and raise release confidence.',
            'Communicated technical decisions in plain language to keep non-technical stakeholders aligned.'
          ]
        },
        {
          title: 'Platform and Delivery',
          bullets: [
            'Drove production improvements across Angular, TypeScript, Node.js, .NET, AWS, and CI/CD workflows.',
            'Diagnosed and resolved end-to-end delivery issues spanning code, infrastructure, and environment layers.',
            'Hardened systems through observability, incident retrospectives, and iterative operational improvements.',
            'Sustained reliable execution under operational pressure across time-sensitive production environments.'
          ]
        }
      ],
      coreStrengths: [
        'Senior technical delivery leadership across implementation, risk reduction, and operational reliability',
        'Full-stack development and API integration across modern ecosystems',
        'Cloud-native delivery with focus on resilience, observability, and operability',
        'Technical leadership that unblocks teams, de-risks delivery, and maintains execution momentum',
        'Delivery discipline across planning, implementation, release, and production support',
        'Stakeholder communication that connects engineering progress to business and customer outcomes'
      ],
      selectedOutcomes: [
        'Led critical delivery streams in mission-sensitive environments while maintaining reliability under operational pressure',
        'Delivered customer-facing platform improvements that measurably reduced friction in daily workflows',
        'Resolved high-impact delivery blockers quickly and safely using deep technical knowledge',
        'Raised release confidence through structured testing, deployment practices, and follow-up disciplines',
        'Maintained delivery momentum in complex multi-integration environments under operational pressure',
        'Prevented scope drift by keeping business priorities visible throughout engineering execution'
      ]
    },
    hospitality: {
      summary: 'Hard-working hospitality professional with experience in front-of-house operations, team coordination, and consistent service delivery under pressure. Known for high-effort execution, reliability across demanding shifts, and a strong team-first work ethic.',
      focusSections: [
        {
          title: 'Guest Experience and Service',
          bullets: [
            'Delivered attentive, high-quality service consistently across diverse customer needs and expectations.',
            'Resolved guest complaints and service issues promptly with professionalism and positive outcomes.',
            'Maintained service standards through high-volume periods and peak trade without compromising quality.',
            'Coordinated clearly with front-of-house and kitchen teams to keep guest expectations aligned.'
          ]
        },
        {
          title: 'Operations and Team Support',
          bullets: [
            'Managed shift priorities and task coordination to sustain smooth, reliable service flow across demanding rosters.',
            'Supported onboarding and coached team members on service standards and operational procedures.',
            'Applied process discipline across POS operations, handover protocols, and venue readiness.',
            'Stepped into high-pressure service needs quickly and consistently to keep team delivery on track.'
          ]
        }
      ],
      coreStrengths: [
        'High-effort execution and dependable work rate in physically and operationally demanding environments',
        'Customer-first service delivery with composure and consistency in high-pressure environments',
        'Front-of-house communication, teamwork, and shift coordination',
        'Operational reliability with close attention to service detail and standards',
        'Practical problem resolution that protects both guest experience and team performance',
        'Process-oriented mindset that translates operational experience into repeatable improvements'
      ],
      selectedOutcomes: [
        'Maintained dependable service output across busy shifts by combining speed, consistency, and strong team support',
        'Delivered consistently positive guest experiences across high-volume and high-pressure service periods',
        'Improved operational consistency through disciplined workflows and proactive team coordination',
        'Strengthened team performance through clear communication, coaching, and practical leadership',
        'Maintained service quality and speed balance to meet standards during peak demand',
        'Surfaced and resolved recurring service bottlenecks through structured observation and team feedback'
      ]
    }
  };

  get activeResumeContent(): ResumeSectionContent {
    return this.resumeContentByMode[this.resumeMode];
  }

  get resumeModeLabel(): string {
    if (this.resumeMode === 'business') {
      return 'Business Analyst Focus';
    }

    if (this.resumeMode === 'technology') {
      return 'Technology Focus';
    }

    if (this.resumeMode === 'hospitality') {
      return 'Hospitality Focus';
    }

    return 'Full';
  }

  onCompactPrintModeChange(event: MatCheckboxChange): void {
    this.compactPrintMode = event.checked;
  }

  onResumeModeChange(event: MatButtonToggleChange): void {
    this.resumeMode = event.value;
  }

  onRoleFocusChange(focus: ResumeMode): void {
    this.resumeMode = focus;
  }

  printResume(): void {
    // Build filename suffix with resume mode and optionally compact
    const modeLabel = this.resumeModeLabel.split(' ')[0]; // Get first word: 'Business', 'Technology', 'Hospitality', or 'Full'
    const parts = [modeLabel];

    if (this.compactPrintMode) {
      parts.push('Compact');
    }

    const suffix = parts.join('-');
    this.printService.print(suffix);
  }
}
