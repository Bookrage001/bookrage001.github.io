import { Component } from '@angular/core';
import { BigonotationComponent } from './bigonotation/bigonotation.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  standalone: true,
  imports: [
    BigonotationComponent
  ]
})
export class DocumentationComponent {

}
