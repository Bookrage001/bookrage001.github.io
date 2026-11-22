import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookrage-website',
  templateUrl: './bookrage-website.component.html',
  styleUrls: ['./bookrage-website.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterModule]
})
export class BookrageWebsiteComponent {
}
