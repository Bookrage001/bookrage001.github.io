import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDrawer, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTreeModule } from '@angular/material';
import { AboutMeComponent } from './about-me/about-me.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { PoductsComponent } from './poducts/poducts.component';
import { LifeMystreeGameComponent } from './poducts/life-mystree-game/life-mystree-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MinecraftComponent } from './dashboard/minecraft/minecraft.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalenderComponent } from './dashboard/calender/calender.component';

const routes: Routes = [
  { path: 'home', component: AboutMeComponent },
  {
    path: 'products', component: PoductsComponent, children: [
      { path: 'life-mystree', component: LifeMystreeGameComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    SidenavListComponent,
    PoductsComponent,
    LifeMystreeGameComponent,
    DashboardComponent,
    MinecraftComponent,
    PageNotFoundComponent,
    CalenderComponent,

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


export class AppModule {
  constructor(private router: Router){

  }
}
