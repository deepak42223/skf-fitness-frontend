import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface WorkoutExercise {
  name: string;
  reps: string;
}

export interface Workout {
  id: string;
  img: string;
  category: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: string;
  duration: string;
  targets: string[];
  description: string;
  equipment: string;
  exercises: WorkoutExercise[];
  restTime: string;
}

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class ExercisesComponent {
  workouts: Workout[] = [
    {
      id: 'deadlift-ladder',
      img: 'ex-deadlift-ladder.jpg',
      category: 'Strength',
      title: 'Deadlift Ladder',
      difficulty: 'Intermediate',
      sets: '5 Sets',
      duration: '25 min',
      targets: ['Back', 'Glutes', 'Hamstrings'],
      description: 'Progressive deadlift sets designed to build strength and power.',
      equipment: 'Barbell + Plates',
      exercises: [
        { name: 'Deadlift', reps: '10 reps' },
        { name: 'Deadlift', reps: '8 reps' },
        { name: 'Deadlift', reps: '6 reps' },
        { name: 'Deadlift', reps: '4 reps' },
        { name: 'Deadlift', reps: '2 reps' },
      ],
      restTime: '90 seconds',
    },
    {
      id: 'barbell-complex',
      img: 'ex-barbell-complex.jpg',
      category: 'Conditioning',
      title: 'Barbell Complex',
      difficulty: 'Intermediate',
      sets: '4 Sets',
      duration: '30 min',
      targets: ['Full Body', 'Conditioning'],
      description: 'A continuous barbell sequence combining strength and conditioning.',
      equipment: 'Barbell + Plates',
      exercises: [
        { name: 'Romanian Deadlift', reps: '6 reps' },
        { name: 'Bent-over Row', reps: '6 reps' },
        { name: 'Hang Clean', reps: '6 reps' },
        { name: 'Front Squat', reps: '6 reps' },
        { name: 'Push Press', reps: '6 reps' },
      ],
      restTime: '2 minutes',
    },
    {
      id: 'treadmill-intervals',
      img: 'ex-treadmill-intervals.jpg',
      category: 'Cardio',
      title: 'Treadmill Intervals',
      difficulty: 'Beginner',
      sets: '8 Rounds',
      duration: '20 min',
      targets: ['Cardio', 'Endurance'],
      description: 'Short running intervals designed to improve cardiovascular fitness.',
      equipment: 'Treadmill',
      exercises: [
        { name: 'Warm-up walk', reps: '3 min' },
        { name: 'Sprint interval', reps: '30 sec' },
        { name: 'Recovery walk', reps: '90 sec' },
        { name: 'Repeat sprint/walk', reps: '×7 rounds' },
        { name: 'Cool-down walk', reps: '2 min' },
      ],
      restTime: '90 seconds (walk)',
    },
    {
      id: 'full-body-stretch',
      img: 'ex-full-body-stretch.jpg',
      category: 'Mobility',
      title: 'Full Body Stretch',
      difficulty: 'Beginner',
      sets: '3 Sets',
      duration: '15 min',
      targets: ['Full Body', 'Flexibility'],
      description: 'A guided mobility session for recovery and flexibility.',
      equipment: 'Yoga Mat',
      exercises: [
        { name: 'Hip flexor stretch', reps: '60 sec each side' },
        { name: 'Hamstring stretch', reps: '60 sec each side' },
        { name: 'Thoracic rotation', reps: '10 reps each side' },
        { name: 'Child\'s pose', reps: '90 sec' },
        { name: 'Doorway chest stretch', reps: '60 sec' },
      ],
      restTime: '30 seconds',
    },
  ];
}
