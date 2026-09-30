import { Component } from '@angular/core';

interface GymClass {
  category: string;
  name: string;
  trainer: string;
  duration: string;
  level: string;
  image: string;
  isLive?: boolean;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class ClassesComponent {
  classes: GymClass[] = [
    {
      category: 'STRENGTH',
      name: 'Strength & Hypertrophy',
      trainer: 'Coach Arjun',
      duration: '60 min',
      level: 'Intermediate',
      image: 'ex-deadlift-ladder.jpg',
      isLive: true,
    },
    {
      category: 'HIIT',
      name: 'Redline Hot HIIT',
      trainer: 'Coach Priya',
      duration: '45 min',
      level: 'Advanced',
      image: 'anastase-maragos-7kEpUPB8vNk-unsplash.jpg',
    },
    {
      category: 'COMBAT',
      name: 'Elite Circuit Pump',
      trainer: 'Coach Rahul',
      duration: '50 min',
      level: 'Intermediate',
      image: 'boxing-wf.jpg',
    },
    {
      category: 'CARDIO',
      name: 'Combat Redline Conditioning',
      trainer: 'Coach Sneha',
      duration: '45 min',
      level: 'Beginner',
      image: 'ex-treadmill-intervals.jpg',
    },
  ];

  getLevelColor(level: string): string {
    if (level === 'Advanced') return '#EF4444';
    if (level === 'Intermediate') return '#F4A623';
    return '#12E0C4';
  }
}
