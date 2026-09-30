import { Component } from '@angular/core';

interface Zone {
  category: string;
  name: string;
  description: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-facility-zones',
  standalone: true,
  imports: [],
  templateUrl: './facility-zones.html',
  styleUrl: './facility-zones.css',
})
export class FacilityZonesComponent {
  zones: Zone[] = [
    {
      category: 'ZONE 01 — POWER',
      name: 'Free Weights & Power Racks',
      description: 'Competition-grade barbells, calibrated plates, unlimited Dead Ends, and memberships up to 8 racks.',
      image: 'victor-freitas-WvDYdXDzkhs-unsplash.jpg',
      tag: 'STRENGTH',
    },
    {
      category: 'ZONE 02 — CARDIO',
      name: 'Cardio & Endurance Theater',
      description: 'Curved-deck treadmills, echo bikes, SkiErg units, and electronic velocity-tracking zones 0–8.',
      image: 'cardio-fitness.jpg',
      tag: 'CARDIO',
    },
    {
      category: 'ZONE 03 — VELOCITY',
      name: 'Functional Turf & Rig',
      description: 'Full-length turf corridor, sled push/pull, psychometric boxes, and compound cable rigs.',
      image: 'functional-training.jpg',
      tag: 'FUNCTIONAL',
    },
    {
      category: 'ZONE 04 — RESTORATION',
      name: 'Recovery Spa & Suites',
      description: 'Contrast therapy, compression massage units, infrared panels, and coached mobility sessions included.',
      image: 'yoga-mobility-wf.jpg',
      tag: 'RECOVERY',
    },
  ];
}
