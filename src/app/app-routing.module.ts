import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProblemSolvingComponent } from './about-me/problem-solving/problem-solving.component';
import { BlogComponent } from './blog/blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { MinecraftComponent } from './dashboard/minecraft/minecraft.component';
import { GamesComponent } from './games/games.component';
import { TickTackToeComponent } from './games/tick-tack-toe/tick-tack-toe.component';
import { AssertiveComponent } from './products/assertive/assertive.component';
import { DistributedAvionicsComponent } from './products/distributed-avionics/distributed-avionics.component';
import { LifeMystreeGameComponent } from './products/life-mystree-game/life-mystree-game.component';
import { BookrageWebsiteComponent } from './products/bookrage-website/bookrage-website.component';
import { VolunteerAppComponent } from './products/volunteer-app/volunteer-app.component';
import { ProductsComponent } from './products/products.component';
import { IndustryExperienceComponent } from './industry-experience/industry-experience.component';
import { ToolsComponent } from './tools/tools.component';
import { DocumentationComponent } from './documentation/documentation.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-me', component: AboutMeComponent, children: [
      { path: 'problem-solving', component: ProblemSolvingComponent },
      // LEADERSHIP
    ]
  },
  { path: 'problem-solving', component: ProblemSolvingComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'bookrage-website', component: BookrageWebsiteComponent },
      { path: 'life-mystree', component: LifeMystreeGameComponent },
      { path: 'volunteer-app', component: VolunteerAppComponent }
    ]
  },
  {
    path: 'industry-experience', component: IndustryExperienceComponent, children: [
      { path: 'assertive', component: AssertiveComponent },
      { path: 'distributed-avionics', component: DistributedAvionicsComponent }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'calender', pathMatch: 'full' },
      { path: 'calender', component: CalenderComponent },
      { path: 'minecraft', component: MinecraftComponent },
    ]
  },
  { path: 'tools', component: ToolsComponent },
  {
    path: 'games', component: GamesComponent, children: [
      { path: 'tickTackToe', component: TickTackToeComponent },
    ]
  },
  { path: 'contact', component: ContactComponent },
  {path: 'documentation', component: DocumentationComponent}
  // { path: '**', component: AboutMeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
