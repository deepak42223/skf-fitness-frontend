import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('dot')   dot!:   ElementRef<HTMLDivElement>;
  @ViewChild('ring')  ring!:  ElementRef<HTMLDivElement>;

  private mouseX = 0;
  private mouseY = 0;
  private rafId  = 0;

  ngOnInit() {
    // Add hover listeners to interactive elements
    this.bindHoverTargets();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Dot follows instantly
    gsap.to(this.dot.nativeElement, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.05,
      ease: 'none',
    });

    // Ring follows with lag
    gsap.to(this.ring.nativeElement, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  private bindHoverTargets() {
    setTimeout(() => {
      const targets = document.querySelectorAll(
        'a, button, [routerLink], .prog-card, .wf-card, .nav-link, .btn-neon-render, .btn-text-link'
      );

      targets.forEach(el => {
        el.addEventListener('mouseenter', () => this.onHoverIn());
        el.addEventListener('mouseleave', () => this.onHoverOut());
      });
    }, 1500);
  }

  private onHoverIn() {
    gsap.to(this.ring.nativeElement, {
      scale: 2.5,
      opacity: 0.6,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.dot.nativeElement, {
      scale: 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  private onHoverOut() {
    gsap.to(this.ring.nativeElement, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.dot.nativeElement, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}
