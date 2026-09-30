import { Component } from '@angular/core';
import { ServicesComponent } from '../../components/services/services';
import { NavbarComponent }  from '../../components/navbar/navbar';
import { FooterComponent }  from '../../components/footer/footer';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [NavbarComponent, ServicesComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-services></app-services>
      <app-footer></app-footer>
    </div>
  `,
})
export class ServicesPageComponent {}
