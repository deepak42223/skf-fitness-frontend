import { Component } from '@angular/core';
import { ServicesComponent } from '../../components/services/services';
import { NavbarComponent }  from '../../components/navbar/navbar';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [NavbarComponent, ServicesComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-services></app-services>
    </div>
  `,
})
export class ServicesPageComponent {}
