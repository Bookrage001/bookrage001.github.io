
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    SidenavListComponent
  ]
})
export class AppComponent implements OnDestroy {


  title = 'Bookrage001';
  mobileQuery: MediaQueryList;

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  private _mobileQueryListener: () => void;

  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


