import { Routes } from '@angular/router';
import { WorkoutDetailComponent }  from './components/workout-detail/workout-detail';
import { ServicesPageComponent }   from './pages/services-page/services-page';
import { TrainersPageComponent }   from './pages/trainers-page/trainers-page';
import { WorkoutsPageComponent }   from './pages/workouts-page/workouts-page';
import { ContactPageComponent }    from './pages/contact-page/contact-page';
import { AboutPageComponent }      from './pages/about-page/about-page';

export const routes: Routes = [
  { path: 'services',      component: ServicesPageComponent,  title: 'Services — SKF Fitness' },
  { path: 'trainers',      component: TrainersPageComponent,  title: 'Trainers — SKF Fitness' },
  { path: 'programs',      component: WorkoutsPageComponent,  title: 'Programs — SKF Fitness' },
  { path: 'contact',       component: ContactPageComponent,   title: 'Contact — SKF Fitness' },
  { path: 'about',         component: AboutPageComponent,     title: 'About Us — SKF Fitness' },
  { path: 'workouts/:id',  component: WorkoutDetailComponent, title: 'Workout — SKF Fitness' },
  { path: '**',            redirectTo: '', pathMatch: 'full' },
];
