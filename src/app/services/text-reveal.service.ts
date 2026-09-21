import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class TextRevealService {

  init() {
    setTimeout(() => {
      this.revealHero();
      this.revealHeadings();
      this.revealSections();
      this.revealCards();
    }, 100);
  }

  private revealHero() {
    // Hero headline — simple slide up, no word split
    const headline = document.querySelector('.hero-headline');
    if (headline) {
      gsap.from(headline, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }
  }

  private revealHeadings() {
    const headings = document.querySelectorAll<HTMLElement>(
      'h2, .tagline-heading, .wf-title, .programs-title, .ex-title, .goal-title, .faq-title, .cta-title'
    );

    headings.forEach((el) => {
      if (el.dataset['gsapReady']) return;
      el.dataset['gsapReady'] = 'true';

      // Only split plain text nodes — skip elements with complex HTML children
      const hasChildElements = el.querySelectorAll('*').length > 0;
      if (hasChildElements) {
        // Simple fade+slide up for complex HTML headings
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
        });
        return;
      }

      // Safe word split for plain text headings only
      const words = el.textContent?.trim().split(/\s+/) || [];
      el.innerHTML = words
        .map(w => `<span class="gsap-word-wrap"><span class="gsap-word">${w}</span></span>`)
        .join(' ');

      gsap.from(el.querySelectorAll('.gsap-word'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
        y: '100%',
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.05,
        clearProps: 'all',
      });
    });
  }

  private revealSections() {
    const elements = document.querySelectorAll<HTMLElement>(
      '.section-tag, .red-line, .ex-subtitle, .wf-desc, .programs-eyebrow, .hero-para, .tagline-desc, .tagline-badge, .section-badge, .hero-eyebrow'
    );

    elements.forEach((el) => {
      if (el.dataset['gsapReady']) return;
      el.dataset['gsapReady'] = 'true';

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none', // play once only
        },
        y: 25,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'all',
      });
    });
  }

  private revealCards() {
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
          start: 'top 92%',
          toggleActions: 'play none none none', // play once, never hide again
        },
        y: 50,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'all', // remove inline styles after animation so CSS takes over
      });
    });
  }

  // Call this after dynamic content loads
  refresh() {
    ScrollTrigger.refresh();
  }
}
