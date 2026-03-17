import { Injectable } from '@angular/core';


import { JobItem } from '../about-me/jobs/job-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  getAds() :Observable<JobItem[]> {
    return of([
      new JobItem({
        role: 'Software Engineer', company: 'Windracers', startDate: new Date('2023-05-01'), endDate: new Date('2026-01-31'), description:
        [
          'Led mission software work with a focus on outcomes that matter to operators and teams on the ground.',
          'Built and integrated microservices into the Distributed Control Application to deliver reliable real-world impact.',
          'Improved security and development practices because quality and trust are core values in my engineering approach.',
          'Stepped into broader responsibilities to support the whole team, not just the codebase.'
        ],
        tags: ['Microservices', 'System Integration', 'Security', 'Software Engineering', 'Cross-Functional Leadership']
      }),
      new JobItem({
        role: 'Software Engineer', company: 'OptimalSlope Ltd', startDate: new Date('2022-11-01'), endDate: new Date('2023-04-01'),  description:
        [
          'Contributed to a new C# application that improved how mining teams design optimal slope walls.',
          'Focused on practical problem solving where technical choices directly improved user capability.',
          'Helped shape design and functionality across the stack to turn ideas into useful tools.'
        ],
        tags: ['C#', '.NET', 'Desktop Application Development', 'Product Design', 'Problem Solving']
      }),
      new JobItem(
        {
          role: 'Programme Coordinator', company: 'PGL Travel LTD', startDate: new Date('2022-07-01'), endDate: new Date('2022-09-01'), description:
            [
              'Coordinated staff programmes to create smooth experiences for schools, staff, and site teams.',
              'Balanced changing requests with operational constraints, strengthening my adaptability and decision making.',
              'Supported reception and activity leadership teams with a service-first, people-focused mindset.'
            ],
          tags: ['Programme Coordination', 'Operations Management', 'Stakeholder Communication', 'Team Leadership', 'Customer Service']
        }
      ),
      new JobItem(
        {
          role: 'Activities Instructor / Group Leader', company: 'PGL Travel LTD', startDate: new Date('2022-02-01'), endDate: new Date('2022-10-01'), description:
            [
              'Led outdoor activities for large groups, creating safe, engaging experiences under changing conditions.',
              'Developed confidence in communication, facilitation, and real-time problem solving.',
              'Partnered closely with accompanying adults to align expectations and deliver a better overall experience.'
            ],
          tags: ['Facilitation', 'Group Leadership', 'Communication', 'Problem Solving', 'Risk Awareness']
        }
      ),
      new JobItem(
        {
          role: 'Technology associate', company: 'Commonwealth Bank of Australia', startDate: new Date('2021-06-01'), endDate: new Date('2022-01-01'), description:
            [
              'Delivered C# .NET solutions with a focus on secure, reliable outcomes for workplace technology.',
              'Supported a VPN rollout to strengthen access and trust across the organization.',
              'Built tools to improve engineering workflows, reflecting a motivation to make teams more effective.'
            ],
          tags: ['C#', '.NET', 'VPN', 'Enterprise IT', 'Workflow Automation']
        }
      ),
      new JobItem(
        {
          role: 'ICT Officer', company: 'Green Point Christian College', startDate: new Date('2021-03-01'), endDate: new Date('2021-12-01'), description:
            [
              'Supported staff and students through service desk work that prioritized empathy and practical outcomes.',
              'Analyzed workflows to improve ICT effectiveness rather than only fixing individual incidents.',
              'Strengthened foundations that helped others focus on teaching and learning.'
            ],
          tags: ['Service Desk', 'IT Support', 'Workflow Analysis', 'Troubleshooting', 'User Support']
        }
      ),
      new JobItem(
        {
          role: 'Innovation Student', company: 'Bachelor of Creative Intelligence and Innovation (UTS)', startDate: new Date('2017-01-01'), endDate: new Date('2020-12-31'), description:
            [
              'Worked with diverse industry partners to design solutions for complex, human-centered challenges.',
              'Developed a strong motivation for interdisciplinary collaboration, innovation, and systems thinking.',
              'Built habits of reflection and learning that continue to guide day-to-day decisions.'
            ],
          tags: ['Innovation', 'Systems Thinking', 'Human-Centered Design', 'Collaboration', 'Critical Thinking']
        }
      ),
      new JobItem(
        {
          role: 'Software Developer', company: 'Assertiv Pty Ltd', startDate: new Date('2018-01-01'), endDate: new Date('2021-12-31'), description:
            [
              'Delivered full-stack solutions across AWS, Node.js, TypeScript, and Angular with strong ownership from design to delivery.',
              'Improved client outcomes through automation, deployment workflows, and infrastructure implementation.',
              'Used initiative and self-directed learning to solve unfamiliar problems and keep momentum on critical work.'
            ],
          tags: ['AWS', 'Node.js', 'TypeScript', 'Angular', 'Full-Stack Development', 'DevOps']
        }
      ),
      new JobItem(
        {
          role: 'Volunteer / Casual', company: 'Ev Church', startDate: new Date('2016-01-01'), endDate: new Date('2022-12-31'), description:
            [
              'Served in flexible technical and production roles to support community events and operations.',
              'Contributed across IT, AV, and electrical needs with a consistent service and reliability mindset.',
              'Adapted to changing responsibilities, reinforcing values of contribution, teamwork, and stewardship.'
            ],
          tags: ['AV Support', 'IT Operations', 'Electrical Support', 'Event Production', 'Teamwork']
        }
      ),
      new JobItem(
        {
          role: 'Casual', company: 'VOIP Pty Ltd', startDate: new Date('2016-01-01'), endDate: new Date('2018-12-31'), description:
            [
              'Supported large-scale telecom hardware preparation, deployment, and refurbishment programs.',
              'Delivered dependable execution on detailed technical tasks where consistency and quality mattered.',
              'Built early foundations in hands-on IT operations, teamwork, and customer-focused delivery.'
            ],
          tags: ['Telecommunications', 'Hardware Deployment', 'Device Refurbishment', 'IT Operations', 'Quality Assurance']
        }
      ),
    ]);
  }
}


