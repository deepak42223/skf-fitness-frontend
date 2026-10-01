import { Component } from '@angular/core';
import { BadgeComponent } from '../badge/badge';
import { StepCardComponent } from '../step-card/step-card';
import { FeatureCardComponent } from '../feature-card/feature-card';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BadgeComponent, StepCardComponent, FeatureCardComponent, TestimonialCardComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  points = [
    {
      num: '01',
      title: 'Programs Built Around You',
      desc: 'Every training block is designed around your fitness level, goals, and availability — never a copy-paste template.'
    },
    {
      num: '02',
      title: 'Certified Coaches on the Floor',
      desc: 'NSCA, NASM & ACE certified trainers guide your form, track your numbers, and push you to perform better every week.'
    },
    {
      num: '03',
      title: 'Recovery Is Part of the Plan',
      desc: 'Mobility work, breathwork, and rest protocols are built into every program — so you stay consistent and injury-free.'
    },
  ];
}
