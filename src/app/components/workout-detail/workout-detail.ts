import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Workout } from '../exercises/exercises';

// Full workout catalogue — single source of truth
export const WORKOUTS: Workout[] = [
  {
    id: 'deadlift-ladder',
    img: 'ex-deadlift-ladder.jpg',
    category: 'Strength',
    title: 'Deadlift Ladder',
    difficulty: 'Intermediate',
    sets: '5 Sets',
    duration: '25 min',
    targets: ['Back', 'Glutes', 'Hamstrings'],
    description: 'Progressive deadlift sets designed to build raw strength and power. Each set decreases in reps while increasing in intensity, pushing your posterior chain to its limit.',
    equipment: 'Barbell + Plates',
    exercises: [
      { name: 'Deadlift', reps: '10 reps' },
      { name: 'Deadlift', reps: '8 reps' },
      { name: 'Deadlift', reps: '6 reps' },
      { name: 'Deadlift', reps: '4 reps' },
      { name: 'Deadlift', reps: '2 reps (max effort)' },
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
    description: 'A continuous barbell sequence that flows from one movement to the next without putting the bar down. Builds strength, endurance, and total-body conditioning simultaneously.',
    equipment: 'Barbell + Plates',
    exercises: [
      { name: 'Romanian Deadlift', reps: '6 reps' },
      { name: 'Bent-over Row', reps: '6 reps' },
      { name: 'Hang Clean', reps: '6 reps' },
      { name: 'Front Squat', reps: '6 reps' },
      { name: 'Push Press', reps: '6 reps' },
    ],
    restTime: '2 minutes between sets',
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
    description: 'Short high-effort running intervals alternated with active recovery walks. Ideal for beginners looking to improve cardiovascular fitness without overloading their joints.',
    equipment: 'Treadmill',
    exercises: [
      { name: 'Warm-up walk', reps: '3 min @ easy pace' },
      { name: 'Sprint interval', reps: '30 sec @ high effort' },
      { name: 'Recovery walk', reps: '90 sec @ easy pace' },
      { name: 'Repeat sprint/walk', reps: '× 7 more rounds' },
      { name: 'Cool-down walk', reps: '2 min @ easy pace' },
    ],
    restTime: '90 sec recovery walk between sprints',
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
    description: 'A guided mobility and stretching session designed for active recovery. Improves range of motion, reduces muscle tightness, and supports long-term joint health.',
    equipment: 'Yoga Mat',
    exercises: [
      { name: 'Hip flexor stretch', reps: '60 sec each side' },
      { name: 'Hamstring stretch', reps: '60 sec each side' },
      { name: 'Thoracic rotation', reps: '10 reps each side' },
      { name: "Child's pose", reps: '90 sec' },
      { name: 'Doorway chest stretch', reps: '60 sec' },
    ],
    restTime: '30 seconds between stretches',
  },
];

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './workout-detail.html',
  styleUrl: './workout-detail.css',
})
export class WorkoutDetailComponent implements OnInit {
  workout = signal<Workout | null>(null);
  notFound = signal(false);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = WORKOUTS.find(w => w.id === id) ?? null;
    if (found) {
      this.workout.set(found);
    } else {
      this.notFound.set(true);
    }
  }

  getDifficultyColor(diff: string): string {
    if (diff === 'Beginner') return '#12E0C4';
    if (diff === 'Advanced') return '#EF4444';
    return '#F4A623';
  }
}
