import { Component } from '@angular/core';

interface Exercise {
  img: string;
  tag: string;
  title: string;
  sets: string;
  time: string;
  kcal: string;
}

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class ExercisesComponent {
  exercises: Exercise[] = [
    {
      img: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      tag: 'Strength',
      title: 'Deadlift Ladder',
      sets: '5 Sets', time: '25 min', kcal: '320 kcal'
    },
    {
      img: 'victor-freitas-WvDYdXDzkhs-unsplash.jpg',
      tag: 'Conditioning',
      title: 'Barbell Complex',
      sets: '4 Sets', time: '30 min', kcal: '380 kcal'
    },
    {
      img: 'danielle-cerullo-CQfNt66ttZM-unsplash.jpg',
      tag: 'Cardio',
      title: 'Treadmill Intervals',
      sets: '8 Sets', time: '20 min', kcal: '300 kcal'
    },
    {
      img: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      tag: 'Mobility',
      title: 'Full Body Stretch',
      sets: '3 Sets', time: '15 min', kcal: '90 kcal'
    },
  ];
}
