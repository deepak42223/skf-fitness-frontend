import { Component } from '@angular/core';
import { TrainersComponent } from '../../components/trainers/trainers';
import { NavbarComponent }   from '../../components/navbar/navbar';

@Component({
  selector: 'app-trainers-page',
  standalone: true,
  imports: [NavbarComponent, TrainersComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-trainers></app-trainers>
    </div>
  `,
})
export class TrainersPageComponent {}
