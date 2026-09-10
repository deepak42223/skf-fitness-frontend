import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
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
