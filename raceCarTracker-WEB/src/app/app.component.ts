import { Component } from '@angular/core';
import {OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RaceTracker';
  items: any[] = [];
  constructor() {}

    ngOnInit(): void {
        
}
}
