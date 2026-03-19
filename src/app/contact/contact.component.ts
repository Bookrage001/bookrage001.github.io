import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface ContactCard {
  title: string;
  subtitle: string;
  description: string;
  label: string;
  icon: string;
  href?: string;
  route?: string;
  external?: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ContactComponent {
  readonly primaryContact: ContactCard = {
    title: 'Email',
    subtitle: 'Usually the simplest place to begin',
    description: 'For roles, consulting work, and product or engineering conversations.',
    label: 'caleb.ardern@bookrage001.com',
    href: 'mailto:caleb.ardern@bookrage001.com',
    icon: 'mail'
  };

  readonly profileCards: ContactCard[] = [
    {
      title: 'LinkedIn',
      subtitle: 'Professional background and messaging',
      description: 'A concise view of career history, roles, and professional context.',
      label: 'Open LinkedIn',
      href: 'https://www.linkedin.com/in/calebgardern/',
      external: true,
      icon: 'account_circle'
    },
    {
      title: 'GitHub',
      subtitle: 'Code, experiments, and technical interests',
      description: 'A public record of projects, prototypes, and the kind of work I like building.',
      label: 'Open GitHub',
      href: 'https://github.com/Bookrage001',
      external: true,
      icon: 'code'
    }
  ];
}
