import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.initObserver();
  }

  private initObserver() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
    }
  }

  observeElements() {
    if (this.observer) {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      elements.forEach(el => {
        this.observer?.observe(el);
      });
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}