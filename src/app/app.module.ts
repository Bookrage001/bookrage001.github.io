import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { AboutMeComponent } from './about-me/about-me.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { PoductsComponent } from './poducts/poducts.component';
import { LifeMystreeGameComponent } from './poducts/life-mystree-game/life-mystree-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MinecraftComponent } from './dashboard/minecraft/minecraft.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolsComponent } from './tools/tools.component';
import { GamesComponent } from './games/games.component';
import { TickTackToeComponent } from './games/tick-tack-toe/tick-tack-toe.component';
import { BinaryToDecimalComponent } from './tools/binary-to-decimal/binary-to-decimal.component';
import { FarenheightToCelsiusComponent } from './tools/farenheight-to-celsius/farenheight-to-celsius.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { FlexLayoutModule } from '@angular/flex-layout';

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
    ToolsComponent,
    GamesComponent,
    TickTackToeComponent,
    BinaryToDecimalComponent,
    FarenheightToCelsiusComponent,
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
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})


export class AppModule {

}
