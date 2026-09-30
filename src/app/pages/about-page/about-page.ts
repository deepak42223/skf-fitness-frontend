import { Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NavbarComponent, AboutComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-about></app-about>
      <app-footer></app-footer>
    </div>
  `,
})
export class AboutPageComponent {}
