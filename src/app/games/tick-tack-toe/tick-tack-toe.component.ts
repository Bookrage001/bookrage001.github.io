import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

type Mark = '' | 'X' | 'O';

@Component({
  selector: 'app-tick-tack-toe',
  templateUrl: './tick-tack-toe.component.html',
  styleUrls: ['./tick-tack-toe.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class TickTackToeComponent {

  turn = 1;

  /** Board cells in row-major order (index 0 = row 1, column 1). */
  readonly cells = signal<Mark[]>(Array<Mark>(9).fill(''));

  rowOf(index: number): number {
    return Math.floor(index / 3);
  }

  colOf(index: number): number {
    return index % 3;
  }

  public select(index: number) {
    if (this.cells()[index]) {
      return;
    }
    const mark: Mark = this.turn % 2 == 1 ? 'X' : 'O';
    this.cells.update(cells => cells.map((cell, i) => (i === index ? mark : cell)));
    this.turn += 1;
  }

  public RESET() {
    this.cells.set(Array<Mark>(9).fill(''));
  }

}
