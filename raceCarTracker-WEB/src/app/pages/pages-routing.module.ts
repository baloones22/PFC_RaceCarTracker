import { PanelShowComponent } from './panel-show/panel-show.component';
import { ChampionshipFormComponent } from "./championship-form/championship-form.component";
import { RoundFormComponent } from "./round-form/round-form.component";
import { CarFormComponent } from "./car-form/car-form.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { CategoryFormComponent } from './category-form/category-form.component';
import { LaptimeFormComponent } from './laptime-form/laptime-form.component';
import { ScreenTimeComponent } from './screen-time/screen-time.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    // redirectTo: 'home',
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "car-form",
        component: CarFormComponent,
      },
      {
        path: "category-form",
        component: CategoryFormComponent,
      },
      {
        path: "championship-form",
        component: ChampionshipFormComponent,
      },
      {
        path: "round-form",
        component: RoundFormComponent,
      },
      {
        path: "laptime-form",
        component: LaptimeFormComponent,
      },
      {
        path: "panel",
        component: PanelShowComponent,
      },{
        path: "screen",
        component: ScreenTimeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
