import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Service {
  idx: string;
  title: string;
  desc: string;
}

interface Stat {
  target: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('statsRow', { static: false }) statsRow?: ElementRef;

  services: Service[] = [
    { idx: '01', title: 'Strength & Weight Training',    desc: 'Progressive overload programs built around compound lifts — squat, deadlift, bench — for real muscle and strength.' },
    { idx: '02', title: 'HIIT & Cardio Conditioning',    desc: 'High-intensity circuits that burn maximum calories, improve cardio capacity, and keep your metabolism elevated all day.' },
    { idx: '03', title: '1-on-1 Personal Coaching',      desc: 'Your dedicated SKF coach builds a custom program, reviews your form, and adjusts your plan every single week.' },
    { idx: '04', title: 'Nutrition & Meal Planning',      desc: 'Science-backed macro plans tailored to your body, training schedule, and Indian food preferences — no bland diets.' },
    { idx: '05', title: 'Recovery, Mobility & Wellness', desc: 'Guided foam rolling, stretching, and breathwork sessions — designed to prevent injury and speed up recovery.' },
  ];

  stats: Stat[] = [
    { target: 50, suffix: '+', label: 'Expert Coaches', current: 0 },
    { target: 2000, suffix: '+', label: 'Members Trained', current: 0 },
    { target: 4.9, suffix: '★', label: 'Average Rating', current: 0 },
    { target: 98, suffix: '%', label: 'Success Rate', current: 0 }
  ];

  private animationFrameId: number | null = null;

  ngAfterViewInit() {
    if (this.statsRow) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animateCounters();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(this.statsRow.nativeElement);
    }
  }

  private animateCounters() {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      this.stats.forEach(stat => {
        stat.current = stat.target * easeOutQuart;
      });

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure final values are exact
        this.stats.forEach(stat => {
          stat.current = stat.target;
        });
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  formatStatValue(stat: Stat): string {
    if (stat.label === 'Average Rating') {
      return stat.current.toFixed(1);
    } else if (stat.target >= 1000) {
      return Math.floor(stat.current).toLocaleString();
    } else {
      return Math.floor(stat.current).toString();
    }
  }
}
