import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { AboutMeComponent } from './about-me/about-me.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { ProductsComponent } from './products/products.component';
import { LifeMystreeGameComponent } from './products/life-mystree-game/life-mystree-game.component';
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
import { ProblemSolvingComponent } from './about-me/problem-solving/problem-solving.component';
import { JobsComponent } from './about-me/jobs/jobs.component';
import { BlogComponent } from './blog/blog.component';
import { IntroductionComponent } from './blog/introduction/introduction.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ComponentsComponent } from './components/components.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { BigonotationComponent } from './documentation/bigonotation/bigonotation.component';
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
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
    RouterModule,
    AboutMeComponent,
    SidenavListComponent,
    ProductsComponent,
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
    ProblemSolvingComponent,
    JobsComponent,
    BlogComponent,
    IntroductionComponent,
    DocumentationComponent,
    ComponentsComponent,
    LineGraphComponent,
    BigonotationComponent,
  ],
  // providers: [],
  // bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppModule {

}
