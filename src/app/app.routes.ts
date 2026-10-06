import { Routes } from '@angular/router';

export const routes: Routes = [
  // Explicit home route so isHomePage() matches both '' and '/'
  {
    path: '',
    pathMatch: 'full',
    children: [],
  },
  { 
    path: 'services', 
    loadComponent: () => import('./pages/services-page/services-page').then(m => m.ServicesPageComponent),
    title: 'Services — SKF Fitness' 
  },
  { 
    path: 'trainers', 
    loadComponent: () => import('./pages/trainers-page/trainers-page').then(m => m.TrainersPageComponent),
    title: 'Trainers — SKF Fitness' 
  },
  { 
    path: 'trainers/:id', 
    loadComponent: () => import('./pages/trainer-detail/trainer-detail').then(m => m.TrainerDetailComponent),
    title: 'Trainer Profile — SKF Fitness' 
  },
  { 
    path: 'programs', 
    loadComponent: () => import('./pages/workouts-page/workouts-page').then(m => m.WorkoutsPageComponent),
    title: 'Programs — SKF Fitness' 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPageComponent),
    title: 'Contact — SKF Fitness' 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPageComponent),
    title: 'About Us — SKF Fitness' 
  },
  { 
    path: 'membership', 
    loadComponent: () => import('./pages/membership-page/membership-page').then(m => m.MembershipPageComponent),
    title: 'Membership — SKF Fitness' 
  },
  { 
    path: 'generator', 
    loadComponent: () => import('./components/workout-generator/workout-generator').then(m => m.WorkoutGeneratorComponent),
    title: 'Workout Generator — SKF Fitness' 
  },
  { 
    path: 'workouts/:id', 
    loadComponent: () => import('./components/workout-detail/workout-detail').then(m => m.WorkoutDetailComponent),
    title: 'Workout — SKF Fitness' 
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];