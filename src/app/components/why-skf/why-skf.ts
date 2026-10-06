import { Component } from '@angular/core';

@Component({
  selector: 'app-why-skf',
  standalone: true,
  imports: [],
  templateUrl: './why-skf.html',
  styleUrl: './why-skf.css'
})
export class WhySkfComponent {
  features = [
    {
      number: '01',
      icon: 'dumbbell',
      image: 'about-coaching.jpg',
      title: 'Expert Coaching',
      description: 'Personalized guidance from certified coaches who understand your goals.'
    },
    {
      number: '02',
      icon: 'activity',
      image: 'about-tracking.jpg',
      title: 'Science-Backed Training',
      description: 'Programs designed around individual goals with proven methodologies.'
    },
    {
      number: '03',
      icon: 'users',
      image: 'about-community.jpg',
      title: 'Real Community',
      description: 'A supportive environment that keeps members accountable and motivated.'
    },
    {
      number: '04',
      icon: 'trending-up',
      image: 'about-progress.jpg',
      title: 'Track Your Progress',
      description: 'Measure progress and stay consistent with data-driven insights.'
    }
  ];

  getIconPath(icon: string): string {
    const paths: { [key: string]: string } = {
      'dumbbell': 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
      'activity': 'M22 12h-4l-3 9L9 3l-3 9H2',
      'users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      'trending-up': 'M23 6l-9.5 9.5-5-5L1 18'
    };
    return paths[icon] || '';
  }
}
