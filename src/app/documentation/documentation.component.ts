import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BigonotationComponent } from './bigonotation/bigonotation.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BigonotationComponent
  ]
})
export class DocumentationComponent {

}
