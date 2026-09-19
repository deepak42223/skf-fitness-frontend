import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class LoaderComponent implements OnInit {
  @Output() done = new EventEmitter<void>();

  counter = 0;
  private target = 100;

  ngOnInit() {
    // Count up 0 → 100
    const obj = { val: 0 };
    gsap.to(obj, {
      val: this.target,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.counter = Math.round(obj.val);
      },
      onComplete: () => {
        // Fade out the loader
        gsap.to('.loader-wrap', {
          opacity: 0,
          y: -30,
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete: () => this.done.emit(),
        });
      },
    });

    // Animate the bar fill
    gsap.to('.loader-bar-fill', {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
    });

    // Stagger logo letters in
    gsap.from('.loader-letter', {
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      delay: 0.2,
    });
  }
}
