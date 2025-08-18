import { Component } from '@angular/core';
import { CalenderComponent } from './calender/calender.component';
import { MinecraftComponent } from './minecraft/minecraft.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CalenderComponent,
    MinecraftComponent
  ]
})
export class DashboardComponent {

  constructor() { }
}
