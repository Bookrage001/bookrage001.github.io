import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDrawer, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTreeModule } from '@angular/material';
import { AboutMeComponent } from './about-me/about-me.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { PoductsComponent } from './poducts/poducts.component';
import { LifeMystreeGameComponent } from './poducts/life-mystree-game/life-mystree-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MinecraftComponent } from './dashboard/minecraft/minecraft.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTreeModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})


export class AppModule {

}
