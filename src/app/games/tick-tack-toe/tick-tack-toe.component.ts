import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tick-tack-toe',
  templateUrl: './tick-tack-toe.component.html',
  styleUrls: ['./tick-tack-toe.component.scss']
})
export class TickTackToeComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  turn = 1;


  public select(location) {
    var thisElement = document.getElementById(location);
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
    var i = 0;
    do {
      var x = document.getElementsByClassName("Nice");
      x[i].innerHTML = " ";
      // x[i].innerHTML.disabled = false;
      i++;
    } while (i < 9);
  }


}
