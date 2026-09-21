import { Component } from '@angular/core';
import { WorkoutFormatComponent } from '../../components/workout-format/workout-format';
import { NavbarComponent }        from '../../components/navbar/navbar';

@Component({
  selector: 'app-workouts-page',
  standalone: true,
  imports: [NavbarComponent, WorkoutFormatComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-workout-format></app-workout-format>
    </div>
  `,
})
export class WorkoutsPageComponent {}
