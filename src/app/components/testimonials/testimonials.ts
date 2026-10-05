import { Component, OnInit, OnDestroy } from '@angular/core';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  achievement: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Rahul Sharma',
      text: 'Lost 15kg in 6 months and gained incredible strength. The trainers at SKF push you to be your absolute best every single day.',
      achievement: 'Lost 15kg in 6 months',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg'
    },
    {
      id: 't2',
      name: 'Priya Patel',
      text: 'Finally found a gym that focuses on proper form and technique. My posture and confidence have completely transformed.',
      achievement: 'Improved posture & strength',
      image: 'samuel-girven-VJ2s0c20qCo-unsplash.jpg'
    },
    {
      id: 't3',
      name: 'Arjun Kumar',
      text: 'The HIIT classes are intense but incredibly effective. Best investment I have made in my health and fitness journey.',
      achievement: 'Built lean muscle mass',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg'
    }
  ];

  currentIndex = 0;
  private intervalId: any = null;
  isFading = false;

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  private stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  nextTestimonial() {
    this.isFading = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.isFading = false;
    }, 150);
  }

  previousTestimonial() {
    this.isFading = true;
    this.resetAutoPlay();
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
      this.isFading = false;
    }, 150);
  }

  goToTestimonial(index: number) {
    if (index !== this.currentIndex) {
      this.isFading = true;
      this.resetAutoPlay();
      setTimeout(() => {
        this.currentIndex = index;
        this.isFading = false;
      }, 150);
    }
  }
}