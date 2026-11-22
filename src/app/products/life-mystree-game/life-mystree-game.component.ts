import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-life-mystree-game',
  templateUrl: './life-mystree-game.component.html',
  styleUrls: ['./life-mystree-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LifeMystreeGameComponent {

  constructor() { }
}
