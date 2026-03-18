import { Component } from '@angular/core';

@Component({
  selector: 'app-tick-tack-toe',
  templateUrl: './tick-tack-toe.component.html',
  styleUrls: ['./tick-tack-toe.component.scss'],
  standalone: true
})
export class TickTackToeComponent {

  turn = 1;

  constructor() { }
  public select(location) {
    const thisElement = document.getElementById(location);
    if (thisElement.innerHTML != "O" && thisElement.innerHTML != "X") {
      if (this.turn % 2 == 1) {
        thisElement.innerHTML = "X";
        this.turn += 1;
      } else {
        thisElement.innerHTML = "O";
        this.turn += 1;
      }
    }
    // thisElement.disabled = true;
  }

  public RESET() {
    let i = 0;
    do {
      const x = document.getElementsByClassName("Nice");
      x[i].innerHTML = " ";
      // x[i].innerHTML.disabled = false;
      i++;
    } while (i < 9);
  }


}
