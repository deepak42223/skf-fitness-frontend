import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

interface Program {
  id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent {
  programs: Program[] = [
    {
      id: 'strength',
      name: 'Strength Training',
      image: 'victor-freitas-WvDYdXDzkhs-unsplash.jpg',
    },
    {
      id: 'cardio',
      name: 'Cardio Fitness',
      image: 'cardio-fitness.jpg',
    },
    {
      id: 'yoga-fit',
      name: 'Yogi & Fitness',
      image: 'yogi-fitness.jpg',
    },
    {
      id: 'yoga',
      name: 'Yoga & Mobility',
      image: 'yoga-mobility.jpg',
    },
    {
      id: 'boxing',
      name: 'Boxing Fitness',
      image: 'boxing-fitness.jpg',
    },
    {
      id: 'personal',
      name: 'Personal Training',
      image: 'personal-training.jpg',
    },
    {
      id: 'dance',
      name: 'Dance Fitness',
      image: 'dance-fitness.jpg',
    },
  ];
}
