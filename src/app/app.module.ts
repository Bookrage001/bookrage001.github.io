import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDrawer, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTreeModule } from '@angular/material';
import { AboutMeComponent } from './about-me/about-me.component';
import { RouterModule, Routes } from '@angular/router';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { PoductsComponent } from './poducts/poducts.component';
import { BciiCicComponent } from './poducts/bcii-cic/bcii-cic.component';

const routes: Routes = [
  { path: 'home', component: AboutMeComponent },
  {
    path: 'products', component: PoductsComponent, children: [
      { path: 'cic', component: BciiCicComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    SidenavListComponent,
    PoductsComponent,
    BciiCicComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
