import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-poducts',
  templateUrl: './poducts.component.html',
  styleUrls: ['./poducts.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class PoductsComponent {

  constructor() { }
}
