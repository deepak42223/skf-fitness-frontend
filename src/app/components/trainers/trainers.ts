import { Component } from '@angular/core';

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  certifications: string;
  image: string;
  instagram?: string;
}

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [],
  templateUrl: './trainers.html',
  styleUrl: './trainers.css'
})
export class TrainersComponent {
  trainers: Trainer[] = [
    {
      id: 'sarah',
      name: 'Sarah Khan',
      specialty: 'HIIT & Strength Training',
      experience: '6+ yrs',
      certifications: 'NASM-CPT, ACSM',
      image: 'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
      instagram: 'https://instagram.com/sarahfitness'
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      specialty: 'Powerlifting & Conditioning',
      experience: '8+ yrs',
      certifications: 'NSCA-CSCS, USA-PL',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      instagram: 'https://instagram.com/mikelifts'
    },
    {
      id: 'lisa',
      name: 'Lisa Patel',
      specialty: 'Yoga & Mobility',
      experience: '5+ yrs',
      certifications: 'RYT-500, FMS',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      instagram: 'https://instagram.com/lisayoga'
    },
    {
      id: 'tony',
      name: 'Tony Martinez',
      specialty: 'Boxing & Combat Sports',
      experience: '10+ yrs',
      certifications: 'USA Boxing, NASM',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      instagram: 'https://instagram.com/tonyboxing'
    }
  ];
}