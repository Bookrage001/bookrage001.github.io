import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-industry-experience',
  templateUrl: './industry-experience.component.html',
  styleUrls: ['./industry-experience.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatIconModule
  ]
})
export class IndustryExperienceComponent {
}
