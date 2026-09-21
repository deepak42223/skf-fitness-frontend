import { Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NavbarComponent, AboutComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-about></app-about>
    </div>
  `,
})
export class AboutPageComponent {}
