import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { TickTackToeComponent } from './games/tick-tack-toe/tick-tack-toe.component';
import { LifeMystreeGameComponent } from './poducts/life-mystree-game/life-mystree-game.component';
import { PoductsComponent } from './poducts/poducts.component';
import { ToolsComponent } from './tools/tools.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AboutMeComponent },
  {
    path: 'products', component: PoductsComponent, children: [
      { path: 'life-mystree', component: LifeMystreeGameComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tools', component: ToolsComponent },
  {
    path: 'games', component: GamesComponent, children: [
      { path: 'tickTackToe', component: TickTackToeComponent },
    ]
  },
  { path: '**', component: AboutMeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
