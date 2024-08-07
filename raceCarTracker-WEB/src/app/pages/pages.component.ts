import { Component, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  public currentTheme: string = "dark";

  links = [
    {
      url: "",
      icon: "home",
      label: "Início",
    },
    {
      url: "/car-form",
      icon: "description",
      label: "Cadastro Carro",
    },
    {
      url: "/championship-form",
      icon: "dashboard_customize",
      label: "Cadastro Campeonato",
    },
    {
      url: "/category-form",
      icon: "dashboard_customize",
      label: "Cadastro Categoria",
    },
    {
      url: "/laptime-form",
      icon: "dashboard_customize",
      label: "Cadastro de Tempos",
    },
    {
      url: "/panel",
      icon: "emoji_events",
      label: "Painel",
    },
    {
      url: "/screen",
      icon: "home",
      label: "Screen Visor",
    },
  ];

  constructor(private themeService: NbThemeService) {
    this.getCurrentTheme();
  }

  ngOnInit(): void { }

  getCurrentTheme() {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.currentTheme = theme.name;
    });
  }

  changeTheme() {
    if (this.currentTheme == "dark") {
      this.themeService.changeTheme("corporate");
    } else {
      this.themeService.changeTheme("dark");
    }
  }
}
