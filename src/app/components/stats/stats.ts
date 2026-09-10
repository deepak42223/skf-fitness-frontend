import { Component, OnInit } from '@angular/core';

interface Stat {
  label: string;
  value: string;
  target: number;
  suffix: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent implements OnInit {
  stats: Stat[] = [
    { label: 'Members Coached', value: '0K+', target: 12, suffix: 'K+' },
    { label: 'Cities Covered',  value: '0+',  target: 40, suffix: '+'  },
    { label: 'Retention Rate',  value: '0%',  target: 98, suffix: '%'  },
    { label: 'Years Running',   value: '0',   target: 9,  suffix: ''   },
  ];

  private animated = false;

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.querySelector('app-stats');
    if (el) observer.observe(el);
  }

  animateCounters() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    this.stats.forEach((stat) => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const current = Math.min(Math.round((stat.target / steps) * step), stat.target);
        stat.value = current + stat.suffix;
        if (step >= steps) clearInterval(timer);
      }, interval);
    });
  }
}
