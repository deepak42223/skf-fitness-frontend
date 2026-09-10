import { Component } from '@angular/core';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
}

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [],
  templateUrl: './membership.html',
  styleUrl: './membership.css'
})
export class MembershipComponent {
  plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 999,
      description: 'Perfect for getting started on your fitness journey',
      features: [
        'Gym access (6AM - 10PM)',
        'Cardio & strength equipment',
        'Locker room access',
        'Free fitness assessment'
      ],
      featured: false,
      cta: 'Start Basic'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 1799,
      description: 'Most popular plan with everything you need to succeed',
      features: [
        'All Basic features',
        '24/7 gym access',
        'All group classes included',
        '2 personal training sessions',
        'Nutrition consultation'
      ],
      featured: true,
      cta: 'Get Started'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 2999,
      description: 'Ultimate package for serious fitness enthusiasts',
      features: [
        'All Pro features',
        'Unlimited personal training',
        'Custom meal plans',
        'Recovery sessions',
        'Priority class booking'
      ],
      featured: false,
      cta: 'Go Elite'
    }
  ];

  selectPlan(planId: string) {
    window.dispatchEvent(new CustomEvent('open-auth-modal', {
      detail: { tab: 'register', plan: planId }
    }));
  }
}