
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, map } from 'rxjs';


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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  private _mobileQueryListener: () => void;

  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  private router = inject(Router);

  // A signal (not a plain field) so OnPush re-renders when navigation ends;
  // toSignal also unsubscribes from router.events on destroy.
  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  get showBackButton(): boolean {
    const segments = this.currentUrl().split('?')[0].split('#')[0].split('/').filter(Boolean);
    return segments.length > 0;
  }

  goBackOneLevel(): void {
    const segments = this.currentUrl().split('?')[0].split('#')[0].split('/').filter(Boolean);

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


