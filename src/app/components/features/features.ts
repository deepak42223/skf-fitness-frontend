import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class FeaturesComponent {
  cards: Feature[] = [
    {
      icon: '🎯',
      title: 'Goal-Based Programming',
      desc: 'Fat loss, muscle gain, endurance — your plan is built specifically around your goal and adjusted every week based on results.'
    },
    {
      icon: '📊',
      title: 'Live Progress Tracking',
      desc: 'Track your heart rate, calories burned, reps, and personal records live during every session via the SKF Fitness app.'
    },
    {
      icon: '🥗',
      title: 'Nutrition Coaching',
      desc: 'Our certified nutritionists create macro-based meal plans tailored to your body type, training load, and food preferences.'
    },
    {
      icon: '🧘',
      title: 'Recovery & Mobility',
      desc: 'Dedicated recovery sessions — foam rolling, guided stretching, and breathwork — built into your weekly schedule automatically.'
    },
  ];
}
