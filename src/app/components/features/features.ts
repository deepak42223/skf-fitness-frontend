import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MacroSlide {
  title: string;
  subtitle: string;
  protein: string;
  carbs: string;
  fats: string;
  badge: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class FeaturesComponent {
  // ── Animated Data Storytelling: Interactive Slider ──
  workoutDays = signal<number>(4);
  caloriesPerWeek = computed(() => this.workoutDays() * 640);
  metabolicBoost = computed(() => Math.round(this.workoutDays() * 14.5));
  recoveryStatus = computed(() => {
    const days = this.workoutDays();
    if (days <= 2) return { text: 'Active Recovery & Tone', color: '#12E0C4' };
    if (days <= 4) return { text: 'Optimal Hypertrophy & Fat Loss', color: '#3498DB' };
    return { text: 'Peak High-Performance Training', color: '#FF6B35' };
  });

  // ── Nested Micro-Carousel for Bento Cell ──
  macroSlides: MacroSlide[] = [
    {
      title: 'Lean Muscle & Hypertrophy',
      subtitle: 'High protein macro split tuned for clean mass',
      protein: '180g (40%)',
      carbs: '220g (40%)',
      fats: '50g (20%)',
      badge: 'Most Popular'
    },
    {
      title: 'Accelerated Fat Loss',
      subtitle: 'Deficit-optimized fuel with satiating healthy fats',
      protein: '175g (45%)',
      carbs: '130g (30%)',
      fats: '48g (25%)',
      badge: 'Cutting Phase'
    },
    {
      title: 'Endurance & Stamina',
      subtitle: 'Glycogen loading for explosive athletic circuits',
      protein: '150g (30%)',
      carbs: '290g (50%)',
      fats: '45g (20%)',
      badge: 'HIIT & Boxing'
    }
  ];
  currentMacroSlide = signal<number>(0);

  nextMacroSlide() {
    this.currentMacroSlide.update(i => (i + 1) % this.macroSlides.length);
  }

  prevMacroSlide() {
    this.currentMacroSlide.update(i => (i - 1 + this.macroSlides.length) % this.macroSlides.length);
  }

  setMacroSlide(index: number) {
    this.currentMacroSlide.set(index);
  }

  // ── Live Status & Tactile Toggle ──
  gymLiveActive = signal<boolean>(true);
  occupancyCount = signal<number>(42);
  maxCapacity = 75;

  occupancyPercent = computed(() => {
    return Math.round((this.occupancyCount() / this.maxCapacity) * 100);
  });

  toggleGymStatus() {
    this.gymLiveActive.update(v => !v);
  }

  // ── 3D Card Perspective / Spatial Hover Physics ──
  onCardMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
  }

  onCardMouseLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
