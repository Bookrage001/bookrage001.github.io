import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    RouterModule
  ]
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

}
