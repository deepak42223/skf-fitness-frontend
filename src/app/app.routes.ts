import { Routes } from '@angular/router';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail';

export const routes: Routes = [
  {
    path: 'workouts/:id',
    component: WorkoutDetailComponent,
    title: 'Workout — SKF Fitness',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
