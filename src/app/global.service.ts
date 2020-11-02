import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sideNavToggle = false;

  constructor() { }

  toggleSideNav() {
    this.sideNavToggle = !this.sideNavToggle;
  };

}
