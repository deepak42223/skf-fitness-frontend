import { Component } from '@angular/core';

interface Service {
  idx: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  services: Service[] = [
    { idx: '01', title: 'Strength & Weight Training',    desc: 'Progressive overload programs built around compound lifts — squat, deadlift, bench — for real muscle and strength.' },
    { idx: '02', title: 'HIIT & Cardio Conditioning',    desc: 'High-intensity circuits that burn maximum calories, improve cardio capacity, and keep your metabolism elevated all day.' },
    { idx: '03', title: '1-on-1 Personal Coaching',      desc: 'Your dedicated SKF coach builds a custom program, reviews your form, and adjusts your plan every single week.' },
    { idx: '04', title: 'Nutrition & Meal Planning',      desc: 'Science-backed macro plans tailored to your body, training schedule, and Indian food preferences — no bland diets.' },
    { idx: '05', title: 'Recovery, Mobility & Wellness', desc: 'Guided foam rolling, stretching, and breathwork sessions — designed to prevent injury and speed up recovery.' },
  ];
}
