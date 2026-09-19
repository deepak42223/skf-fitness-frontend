import { Injectable, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
  private lenis!: Lenis;

  init() {
    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Hook Lenis into GSAP ticker for ScrollTrigger compatibility
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  ngOnDestroy() {
    this.lenis?.destroy();
  }

  scrollTo(target: string | HTMLElement, offset = 0) {
    this.lenis?.scrollTo(target, { offset });
  }
}
