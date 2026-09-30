import { Component } from '@angular/core';
import { TrainersComponent } from '../../components/trainers/trainers';
import { NavbarComponent }   from '../../components/navbar/navbar';
import { FooterComponent }   from '../../components/footer/footer';

@Component({
  selector: 'app-trainers-page',
  standalone: true,
  imports: [NavbarComponent, TrainersComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-trainers></app-trainers>
      <app-footer></app-footer>
    </div>
  `,
})
export class TrainersPageComponent {}
