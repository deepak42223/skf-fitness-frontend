import { Component, Input, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AnimationEffect = 'rotate' | 'slide' | 'zoom' | 'type' | 'clip' | 'fade';

@Component({
  selector: 'app-animated-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-headline.component.html',
  styleUrls: ['./animated-headline.component.css']
})
export class AnimatedHeadlineComponent implements OnInit, OnDestroy {
  @Input() staticText = '';
  @Input() words: string[] = [];
  @Input() effect: AnimationEffect = 'rotate';
  @Input() animationDelay = 2500;
  @Input() staticTextClass = '';
  @Input() wrapperClass = '';

  currentIndex = signal(0);
  isAnimating = signal(false);
  private intervalId?: number;

  constructor() {
    // React to index changes
    effect(() => {
      const index = this.currentIndex();
      // Trigger animation state
      this.isAnimating.set(true);
      setTimeout(() => this.isAnimating.set(false), 100);
    });
  }

  ngOnInit() {
    if (this.words.length > 1) {
      this.startAnimation();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startAnimation() {
    this.intervalId = window.setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.words.length);
    }, this.animationDelay);
  }

  getEffectClass(): string {
    return `effect-${this.effect}`;
  }

  isVisible(index: number): boolean {
    return this.currentIndex() === index;
  }

  getWordClass(index: number): string {
    const classes: string[] = [];
    
    if (this.isVisible(index)) {
      classes.push('is-visible');
    } else {
      classes.push('is-hidden');
    }
    
    return classes.join(' ');
  }
}
