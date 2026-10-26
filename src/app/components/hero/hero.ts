import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  private carouselInterval: any;
  private currentRotation = 0;
  private slideCount = 4;
  private angleStep = 360 / this.slideCount; // 90 degrees for 4 images

  ngOnInit() {
    setTimeout(() => {
      this.initCarousel();
      this.startCarousel();
    }, 100);
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private initCarousel() {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    const slides = Array.from(document.querySelectorAll('.carousel-slide')) as HTMLElement[];
    
    if (!container || !slides.length) return;

    // Position each slide in 3D space
    slides.forEach((slide, index) => {
      const angle = index * this.angleStep;
      const radius = 800; // Distance from center
      slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
  }

  private startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.rotateCarousel();
    }, 5000); // Rotate every 5 seconds
  }

  private rotateCarousel() {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (!container) return;

    this.currentRotation -= this.angleStep; // Rotate to next image
    container.style.transform = `translateZ(-800px) rotateY(${this.currentRotation}deg)`;
  }

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
  }
}
