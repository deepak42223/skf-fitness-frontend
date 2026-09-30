import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from './swoldier';
import { NavbarComponent } from '../navbar/navbar';
import { FooterComponent } from '../footer/footer';

export interface GeneratedExercise {
  name: string;
  tempo: string;
  rest: number;
  reps: number | string;
  type: string;
  muscles: string[];
  description: string;
  substitutes: string[];
  unit: string;
}

@Component({
  selector: 'app-workout-generator',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './workout-generator.html',
  styleUrl: './workout-generator.css',
})
export class WorkoutGeneratorComponent {
  // ── State ──
  poison  = signal<string>('individual');
  muscles = signal<string[]>([]);
  goal    = signal<string>('strength_Power');
  workout = signal<GeneratedExercise[] | null>(null);
  showMuscleModal = signal(false);
  setsCompleted: Record<number, number> = {};

  // ── Data ──
  workoutTypes  = Object.keys(WORKOUTS);
  goalTypes     = Object.keys(SCHEMES);

  muscleOptions = computed<string[]>(() => {
    const p = this.poison();
    if (p === 'individual') return WORKOUTS['individual'] as string[];
    return Object.keys(WORKOUTS[p]);
  });

  // ── Actions ──
  selectPoison(type: string) {
    this.muscles.set([]);
    this.poison.set(type);
  }

  toggleMuscle(m: string) {
    const current = this.muscles();
    if (current.includes(m)) {
      this.muscles.set(current.filter(v => v !== m));
      return;
    }
    if (current.length > 2) return;
    if (this.poison() !== 'individual') {
      this.muscles.set([m]);
      this.showMuscleModal.set(false);
      return;
    }
    const updated = [...current, m];
    this.muscles.set(updated);
    if (updated.length === 2) this.showMuscleModal.set(false);
  }

  generateWorkout() {
    const m = this.muscles();
    if (m.length < 1) return;
    const result = this.runGenerator(this.poison(), m, this.goal());
    this.workout.set(result);
    this.setsCompleted = {};
    setTimeout(() => {
      document.getElementById('wg-workout')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  incrementSet(i: number) {
    this.setsCompleted[i] = ((this.setsCompleted[i] || 0) + 1) % 6;
  }

  getSetCount(i: number): number {
    return this.setsCompleted[i] || 0;
  }

  formatName(name: string): string {
    return name.replaceAll('_', ' ');
  }

  formatLabel(label: string): string {
    return label.replaceAll('_', ' ');
  }

  getMuscleIcon(muscle: string): string {
    const icons: Record<string, string> = {
      chest: '🫁', back: '🔙', shoulders: '💪', biceps: '💪',
      triceps: '💪', quads: '🦵', hamstrings: '🦵', glutes: '🍑',
      calves: '🦵', abs: '⚡', push: '↗', pull: '↙', legs: '🦵',
      upper: '⬆', lower: '⬇', arms: '💪',
    };
    return icons[muscle] ?? '🏋️';
  }

  // ── Generator Algorithm (ported from functions.js) ──
  private runGenerator(poison: string, muscles: string[], goal: string): GeneratedExercise[] {
    const exercises = this.flattenExercises();
    let exerKeys = Object.keys(exercises).filter(k => exercises[k].meta.environment !== 'home');

    const includedTracker: string[] = [];
    let listOfMuscles: string[];

    if (poison === 'individual') {
      listOfMuscles = muscles;
    } else {
      listOfMuscles = WORKOUTS[poison][muscles[0]] as string[];
    }

    listOfMuscles = Array.from(new Set(this.shuffleArray([...listOfMuscles])));
    const scheme = goal;
    const schemeData = SCHEMES[scheme];

    const sets = schemeData.ratio.reduce((acc: any[], curr: number, index: number) => {
      return [
        ...acc,
        ...Array.from({ length: curr }, () => index === 0 ? 'compound' : 'accessory'),
      ];
    }, []).reduce((acc: any[], curr: string, index: number) => {
      const mg = listOfMuscles[index % listOfMuscles.length];
      return [...acc, { setType: curr, muscleGroup: mg }];
    }, []);

    const { compound: compoundEx, accessory: accessoryEx } = exerKeys.reduce(
      (acc: any, curr) => {
        const ex = exercises[curr];
        const hasMusc = ex.muscles.some((m: string) => (listOfMuscles as string[]).includes(m));
        if (!hasMusc) return acc;
        return { ...acc, [ex.type]: { ...acc[ex.type], [curr]: ex } };
      },
      { compound: {}, accessory: {} }
    );

    const genWOD = sets.map(({ setType, muscleGroup }: { setType: string; muscleGroup: string }) => {
      const data = setType === 'compound' ? compoundEx : accessoryEx;
      const filtered = Object.keys(data).filter(k =>
        !includedTracker.includes(k) && data[k].muscles.includes(muscleGroup)
      );
      const oppFiltered = Object.keys(
        setType === 'compound' ? accessoryEx : compoundEx
      ).filter(k => !includedTracker.includes(k));

      const randomKey = filtered[Math.floor(Math.random() * filtered.length)]
        || oppFiltered[Math.floor(Math.random() * oppFiltered.length)];

      if (!randomKey) return null;

      const ex = exercises[randomKey];
      const [repMin, repMax] = schemeData.repRanges;
      let reps: number;

      if (ex.unit === 'reps') {
        reps = repMin + Math.floor(Math.random() * (repMax - repMin)) + (setType === 'accessory' ? 4 : 0);
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];
        const tempoSum = tempo.split(' ').reduce((a: number, b: string) => a + parseInt(b), 0);
        if (tempoSum * reps > 85) reps = Math.floor(85 / tempoSum);
        includedTracker.push(randomKey);
        return {
          name: randomKey,
          tempo,
          rest: schemeData.rest[setType === 'compound' ? 0 : 1],
          reps,
          ...ex,
        };
      } else {
        const duration = Math.ceil((Math.floor(Math.random() * 40) + 20) / 5) * 5;
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];
        includedTracker.push(randomKey);
        return { name: randomKey, tempo, rest: schemeData.rest[1], reps: duration, ...ex };
      }
    });

    return genWOD.filter(Boolean) as GeneratedExercise[];
  }

  private flattenExercises() {
    const flat: Record<string, any> = {};
    for (const [key, val] of Object.entries(EXERCISES)) {
      if (!val.variants) {
        flat[key] = val;
      } else {
        for (const variant of Object.keys(val.variants)) {
          const varName = `${variant}_${key}`;
          const otherVariants = Object.keys(val.variants!)
            .map(v => `${v} ${key}`)
            .filter(v => v.replaceAll(' ', '_') !== varName);
          flat[varName] = {
            ...val,
            description: val.description + '___' + (val.variants as any)[variant],
            substitutes: [...val.substitutes, ...otherVariants].slice(0, 5),
          };
        }
      }
    }
    return flat;
  }

  private shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
