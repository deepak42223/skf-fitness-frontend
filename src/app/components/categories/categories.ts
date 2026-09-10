import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  intensity: string;
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
      id: 'hiit',
      name: 'HIIT Training',
      description: 'High-intensity interval training that burns maximum calories and builds explosive power',
      icon: '🔥',
      duration: '30-45 min',
      intensity: 'High',
      image: 'ivana-cajina-rdZg6xmnpVM-unsplash.jpg'
    },
    {
      id: 'strength',
      name: 'Strength & Power',
      description: 'Build serious muscle and raw strength with progressive overload training',
      icon: '💪',
      duration: '60-75 min',
      intensity: 'High',
      image: 'anastase-maragos-9dzWZQWZMdE-unsplash.jpg'
    },
    {
      id: 'yoga',
      name: 'Yoga & Recovery',
      description: 'Restore balance, improve flexibility, and enhance mind-body connection',
      icon: '🧘',
      duration: '45-60 min',
      intensity: 'Low',
      image: 'lorenzo-fatto-offidani-de5OZMjb5ww-unsplash.jpg'
    },
    {
      id: 'boxing',
      name: 'Combat Training',
      description: 'Boxing, kickboxing, and martial arts for ultimate conditioning',
      icon: '🥊',
      duration: '45-60 min',
      intensity: 'High',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg'
    }
  ];
}
