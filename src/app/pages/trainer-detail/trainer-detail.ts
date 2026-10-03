import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  certifications: string;
  image: string;
  bio: string;
  fullBio: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  nextAvailable?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  hourlyRate: number;
  achievements: string[];
  languages: string[];
  gallery: string[];
  videoUrl?: string;
}

interface Review {
  id: string;
  memberName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

@Component({
  selector: 'app-trainer-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './trainer-detail.html',
  styleUrl: './trainer-detail.css'
})
export class TrainerDetailComponent implements OnInit {
  trainerId: string = '';
  trainer: Trainer | null = null;
  reviews: Review[] = [];
  selectedGalleryImage: string | null = null;

  // Mock data - replace with API call
  trainersData: Trainer[] = [
    {
      id: 'sarah',
      name: 'Sarah Khan',
      specialty: 'HIIT & Strength Training',
      experience: '6+ yrs',
      certifications: 'NASM-CPT, ACSM',
      image: 'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
      bio: 'Passionate about helping clients achieve their peak performance through science-backed training methods.',
      fullBio: 'Sarah Khan is a certified personal trainer with over 6 years of experience in HIIT and strength training. She specializes in creating customized workout programs that deliver real results. Sarah believes in the power of consistency and proper form, ensuring her clients not only reach their goals but maintain them long-term. Her approach combines cutting-edge fitness science with motivational coaching to help you become the best version of yourself.',
      rating: 4.9,
      reviewCount: 47,
      available: true,
      hourlyRate: 1500,
      instagram: 'https://instagram.com/sarahfitness',
      facebook: 'https://facebook.com/sarahfitness',
      whatsapp: '919876543210',
      achievements: [
        'NASM Certified Personal Trainer',
        'ACSM Exercise Physiologist',
        'Trained 200+ clients to their goals',
        'Former competitive CrossFit athlete',
        'Nutrition specialist certification'
      ],
      languages: ['English', 'Hindi', 'Urdu'],
      gallery: [
        'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
        'spencer-davis-0ShTs8iPY28-unsplash.jpg',
        'charles-gaudreault-xXofYCc3hqc-unsplash.jpg'
      ]
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      specialty: 'Powerlifting & Conditioning',
      experience: '8+ yrs',
      certifications: 'NSCA-CSCS, USA-PL',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      bio: 'Former competitive powerlifter dedicated to building strength and mental resilience in every athlete.',
      fullBio: 'Mike Rodriguez brings 8+ years of powerlifting and conditioning expertise to SKF Fitness. As a former competitive powerlifter, Mike understands what it takes to push beyond limits. His training philosophy focuses on progressive overload, proper technique, and building mental toughness alongside physical strength. Whether you want to compete or just get stronger, Mike will guide you every step of the way.',
      rating: 5.0,
      reviewCount: 62,
      available: true,
      hourlyRate: 2000,
      instagram: 'https://instagram.com/mikelifts',
      facebook: 'https://facebook.com/mikelifts',
      whatsapp: '919876543211',
      achievements: [
        'NSCA Certified Strength & Conditioning Specialist',
        'USA Powerlifting Level 1 Coach',
        'State Powerlifting Champion (2018)',
        'Coached athletes to national competitions',
        'Sports injury rehabilitation certified'
      ],
      languages: ['English', 'Spanish'],
      gallery: [
        'spencer-davis-0ShTs8iPY28-unsplash.jpg',
        'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
        'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg'
      ]
    },
    {
      id: 'lisa',
      name: 'Lisa Patel',
      specialty: 'Yoga & Mobility',
      experience: '5+ yrs',
      certifications: 'RYT-500, FMS',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      bio: 'Helping clients find balance, flexibility, and inner strength through mindful movement practices.',
      fullBio: 'Lisa Patel is a registered yoga teacher (RYT-500) with extensive training in mobility and functional movement. With 5+ years of teaching experience, Lisa specializes in helping clients improve flexibility, reduce stress, and prevent injuries through yoga and targeted mobility work. Her classes blend traditional yoga philosophy with modern movement science, creating a holistic approach to wellness.',
      rating: 4.8,
      reviewCount: 38,
      available: false,
      nextAvailable: 'Oct 8',
      hourlyRate: 1200,
      instagram: 'https://instagram.com/lisayoga',
      facebook: 'https://facebook.com/lisayoga',
      whatsapp: '919876543212',
      achievements: [
        'RYT-500 Registered Yoga Teacher',
        'Functional Movement Screen Certified',
        'Meditation instructor certification',
        'Prenatal yoga specialist',
        'Featured in Yoga Journal India'
      ],
      languages: ['English', 'Hindi', 'Gujarati'],
      gallery: [
        'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
        'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
        'spencer-davis-0ShTs8iPY28-unsplash.jpg'
      ]
    },
    {
      id: 'tony',
      name: 'Tony Martinez',
      specialty: 'Boxing & Combat Sports',
      experience: '10+ yrs',
      certifications: 'USA Boxing, NASM',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      bio: 'Professional boxing coach who combines technical precision with intense conditioning for real results.',
      fullBio: 'Tony Martinez is a professional boxing coach with 10+ years of experience training fighters and fitness enthusiasts. His background includes competitive boxing, coaching amateur boxers to regional titles, and developing high-intensity conditioning programs. Tony\'s training goes beyond throwing punches - it builds discipline, coordination, cardiovascular endurance, and confidence.',
      rating: 4.9,
      reviewCount: 54,
      available: true,
      hourlyRate: 1800,
      instagram: 'https://instagram.com/tonyboxing',
      facebook: 'https://facebook.com/tonyboxing',
      whatsapp: '919876543213',
      achievements: [
        'USA Boxing Level 2 Coach',
        'NASM Personal Training Certified',
        'Trained 5 regional boxing champions',
        'Former Golden Gloves competitor',
        'Kickboxing instructor certification'
      ],
      languages: ['English', 'Spanish', 'Hindi'],
      gallery: [
        'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
        'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
        'charles-gaudreault-xXofYCc3hqc-unsplash.jpg'
      ]
    }
  ];

  reviewsData: { [key: string]: Review[] } = {
    sarah: [
      {
        id: '1',
        memberName: 'Priya S.',
        rating: 5,
        date: '2026-09-15',
        comment: 'Sarah transformed my fitness journey! Her HIIT sessions are challenging but incredibly effective. Lost 10kg in 3 months!',
        verified: true
      },
      {
        id: '2',
        memberName: 'Rahul M.',
        rating: 5,
        date: '2026-08-22',
        comment: 'Best trainer I\'ve worked with. Sarah really knows her stuff and pushes you to your limits safely.',
        verified: true
      },
      {
        id: '3',
        memberName: 'Anjali K.',
        rating: 4,
        date: '2026-07-10',
        comment: 'Great coach! Very knowledgeable about nutrition and strength training. Highly recommend.',
        verified: true
      }
    ],
    mike: [
      {
        id: '1',
        memberName: 'Arjun P.',
        rating: 5,
        date: '2026-09-20',
        comment: 'Mike helped me add 50kg to my deadlift in 6 months. His powerlifting knowledge is unmatched!',
        verified: true
      },
      {
        id: '2',
        memberName: 'Vikram S.',
        rating: 5,
        date: '2026-08-28',
        comment: 'Incredible strength coach. Patient, technical, and motivating. Worth every rupee!',
        verified: true
      }
    ],
    lisa: [
      {
        id: '1',
        memberName: 'Neha R.',
        rating: 5,
        date: '2026-09-10',
        comment: 'Lisa\'s yoga classes have completely changed my flexibility and reduced my back pain. So grateful!',
        verified: true
      },
      {
        id: '2',
        memberName: 'Kavita D.',
        rating: 5,
        date: '2026-08-15',
        comment: 'Best yoga instructor in Hyderabad. Her prenatal yoga sessions were life-changing during my pregnancy.',
        verified: true
      }
    ],
    tony: [
      {
        id: '1',
        memberName: 'Rohan T.',
        rating: 5,
        date: '2026-09-25',
        comment: 'Tony is a beast! His boxing training is intense but so much fun. Lost fat and gained serious skills.',
        verified: true
      },
      {
        id: '2',
        memberName: 'Karthik V.',
        rating: 5,
        date: '2026-09-01',
        comment: 'Professional coach who takes time to teach proper technique. Great cardio workout too!',
        verified: true
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.trainerId = params['id'];
      this.loadTrainer();
      this.loadReviews();
    });
  }

  loadTrainer() {
    this.trainer = this.trainersData.find(t => t.id === this.trainerId) || null;
    if (!this.trainer) {
      this.router.navigate(['/trainers']);
    }
  }

  loadReviews() {
    this.reviews = this.reviewsData[this.trainerId] || [];
  }

  bookSession() {
    if (this.trainer) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', {
        detail: { tab: 'register', trainer: this.trainer.id }
      }));
    }
  }

  contactWhatsApp() {
    if (this.trainer?.whatsapp) {
      const message = `Hi ${this.trainer.name}, I'm interested in booking a training session with you.`;
      window.open(`https://wa.me/${this.trainer.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    }
  }

  openGalleryImage(image: string) {
    this.selectedGalleryImage = image;
  }

  closeGallery() {
    this.selectedGalleryImage = null;
  }

  goBack() {
    this.router.navigate(['/trainers']);
  }
}
