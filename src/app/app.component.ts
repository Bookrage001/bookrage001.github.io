
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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
    MatButtonModule,
    RouterModule,
    SidenavListComponent
  ]
})
export class AppComponent implements OnDestroy {


  title = 'Bookrage001';
  mobileQuery: MediaQueryList;
  currentUrl = '/';

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  private _mobileQueryListener: () => void;

  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  private router = inject(Router);

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  get showBackButton(): boolean {
    const segments = this.currentUrl.split('?')[0].split('#')[0].split('/').filter(Boolean);
    return segments.length > 0;
  }

  goBackOneLevel(): void {
    const segments = this.currentUrl.split('?')[0].split('#')[0].split('/').filter(Boolean);

    if (segments.length <= 1) {
      void this.router.navigateByUrl('/');
      return;
    }

    const parentUrl = `/${segments.slice(0, -1).join('/')}`;
    void this.router.navigateByUrl(parentUrl);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


