import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class TextRevealService {

  init() {
    setTimeout(() => {
      this.revealHeadings();
      this.revealSections();
      this.revealCards();
    }, 100);
  }

  private revealHeadings() {
    // Find all section headings with [data-reveal] or h2 inside sections
    const headings = document.querySelectorAll<HTMLElement>(
      'h2, .hero-headline, .tagline-heading, .wf-title, .programs-title, .ex-title, .goal-title, .faq-title, .cta-title'
    );

    headings.forEach((el) => {
      // Wrap each word in a span for line-by-line reveal
      if (el.dataset['gsapReady']) return;
      el.dataset['gsapReady'] = 'true';

      const text = el.innerHTML;
      // Split words, preserve HTML tags
      const words = text.split(/(\s+)/).filter(w => w.trim());
      el.innerHTML = words
        .map(w => `<span class="gsap-word-wrap"><span class="gsap-word">${w}</span></span>`)
        .join(' ');

      gsap.from(el.querySelectorAll('.gsap-word'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        y: '100%',
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.05,
      });
    });
  }

  private revealSections() {
    // Fade-up for paragraphs, subheadings, badges
    const elements = document.querySelectorAll<HTMLElement>(
      '.section-tag, .red-line, .ex-subtitle, .wf-desc, .programs-eyebrow, .hero-para, .tagline-desc, .tagline-badge, .section-badge, .hero-eyebrow'
    );

    elements.forEach((el) => {
      if (el.dataset['gsapReady']) return;
      el.dataset['gsapReady'] = 'true';

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }

  private revealCards() {
    // Stagger cards in each grid
    const grids = document.querySelectorAll<HTMLElement>(
      '.programs-row, .wf-grid, .goal-cards, .ex-grid, .other-locations-grid'
    );

    grids.forEach((grid) => {
      if (grid.dataset['gsapReady']) return;
      grid.dataset['gsapReady'] = 'true';

      const children = Array.from(grid.children) as HTMLElement[];
      gsap.from(children, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    });
  }

  // Call this after dynamic content loads
  refresh() {
    ScrollTrigger.refresh();
  }
}
