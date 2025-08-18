import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
