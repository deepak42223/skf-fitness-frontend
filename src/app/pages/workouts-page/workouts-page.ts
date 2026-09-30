import { Component } from '@angular/core';
import { WorkoutFormatComponent } from '../../components/workout-format/workout-format';
import { NavbarComponent }        from '../../components/navbar/navbar';
import { FooterComponent }        from '../../components/footer/footer';

@Component({
  selector: 'app-workouts-page',
  standalone: true,
  imports: [NavbarComponent, WorkoutFormatComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-workout-format></app-workout-format>
      <app-footer></app-footer>
    </div>
  `,
})
export class WorkoutsPageComponent {}
