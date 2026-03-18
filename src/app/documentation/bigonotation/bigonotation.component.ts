import { Component } from '@angular/core';
import { LineGraphComponent } from '../../components/line-graph/line-graph.component';

@Component({
  selector: 'app-bigonotation',
  templateUrl: './bigonotation.component.html',
  styleUrls: ['./bigonotation.component.scss'],
  standalone: true,
  imports: [
    LineGraphComponent
  ]
})
export class BigonotationComponent {

}
