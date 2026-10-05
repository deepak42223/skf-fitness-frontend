import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  certifications: string;
  image: string;
  bio: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  nextAvailable?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  hourlyRate?: number;
  category: string[];
  clientsCount: number;
  quote?: string;
}

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trainers.html',
  styleUrl: './trainers.css'
})
export class TrainersComponent {
  trainers: Trainer[] = [
    {
      id: 'sarah',
      name: 'Sarah Khan',
      specialty: 'Strength Coach',
      experience: '8 Years',
      certifications: 'NASM-CPT, ACSM',
      image: 'samuel-girven-VJ2s0c20qCo-unsplash.jpg',
      bio: 'Passionate about helping clients achieve their peak performance through science-backed training methods.',
      rating: 4.9,
      reviewCount: 47,
      available: true,
      hourlyRate: 1500,
      instagram: 'https://instagram.com/sarahfitness',
      facebook: 'https://facebook.com/sarahfitness',
      whatsapp: '919876543210',
      category: ['strength', 'hiit'],
      clientsCount: 120,
      quote: 'Your strongest version starts with your next workout.'
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      specialty: 'HIIT Specialist',
      experience: '6 Years',
      certifications: 'NSCA-CSCS, USA-PL',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      bio: 'Former competitive powerlifter dedicated to building strength and mental resilience in every athlete.',
      rating: 5.0,
      reviewCount: 62,
      available: true,
      hourlyRate: 2000,
      instagram: 'https://instagram.com/mikelifts',
      facebook: 'https://facebook.com/mikelifts',
      whatsapp: '919876543211',
      category: ['hiit', 'strength', 'weight-loss'],
      clientsCount: 95,
      quote: 'Push your limits, discover your strength.'
    },
    {
      id: 'lisa',
      name: 'Lisa Patel',
      specialty: 'Yoga Instructor',
      experience: '5 Years',
      certifications: 'RYT-500, FMS',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      bio: 'Helping clients find balance, flexibility, and inner strength through mindful movement practices.',
      rating: 4.8,
      reviewCount: 38,
      available: false,
      nextAvailable: 'Oct 8',
      hourlyRate: 1200,
      instagram: 'https://instagram.com/lisayoga',
      facebook: 'https://facebook.com/lisayoga',
      whatsapp: '919876543212',
      category: ['yoga'],
      clientsCount: 80,
      quote: 'Find your balance, find your power.'
    },
    {
      id: 'tony',
      name: 'Tony Martinez',
      specialty: 'Fitness Coach',
      experience: '7 Years',
      certifications: 'USA Boxing, NASM',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      bio: 'Professional boxing coach who combines technical precision with intense conditioning for real results.',
      rating: 4.9,
      reviewCount: 54,
      available: true,
      hourlyRate: 1800,
      instagram: 'https://instagram.com/tonyboxing',
      facebook: 'https://facebook.com/tonyboxing',
      whatsapp: '919876543213',
      category: ['strength', 'hiit', 'weight-loss'],
      clientsCount: 110,
      quote: 'Train like a champion, feel like a champion.'
    }
  ];

  bookingLoading = signal(false);
  bookingError = signal('');

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  bookSession(trainer: Trainer) {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', {
        detail: { tab: 'login', trainerId: trainer.id }
      }));
      return;
    }

    // TODO: Open booking modal for date/time selection
    // For now, book for tomorrow at 10 AM for 60 minutes
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    this.bookingLoading.set(true);
    this.bookingError.set('');

    const bookingData = {
      trainerId: parseInt(trainer.id) || 1,
      trainerName: trainer.name,
      date: dateStr,
      startTime: '10:00 AM',
      duration: 60,
      hourlyRate: trainer.hourlyRate || 1500,
      notes: 'Personal training session',
    };

    this.bookingService.bookTrainer(bookingData).subscribe({
      next: (result) => {
        this.bookingLoading.set(false);
        const totalAmount = bookingData.hourlyRate;
        alert(`✅ Session with ${trainer.name} booked successfully!\nDate: ${dateStr}\nTime: ${bookingData.startTime}\nAmount: ₹${totalAmount}`);
      },
      error: (err) => {
        this.bookingLoading.set(false);
        const errorMsg = err?.error?.message || 'Booking failed. Please try again.';
        this.bookingError.set(errorMsg);
        alert(`❌ ${errorMsg}`);
      }
    });
  }

  contactWhatsApp(trainer: Trainer) {
    if (trainer.whatsapp) {
      const message = `Hi ${trainer.name}, I'm interested in booking a training session with you.`;
      window.open(`https://wa.me/${trainer.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    }
  }

  // Filtering functionality
  activeFilter: string = 'all';
  
  get featuredTrainer(): Trainer {
    return this.trainers[0]; // First trainer is featured
  }
  
  get regularTrainers(): Trainer[] {
    // Return remaining trainers after featured
    return this.filteredTrainers.filter(t => t.id !== this.featuredTrainer.id);
  }
  
  get filteredTrainers(): Trainer[] {
    if (this.activeFilter === 'all') {
      return this.trainers;
    }
    return this.trainers.filter(t => 
      t.category.includes(this.activeFilter)
    );
  }

  get filterOptions() {
    return [
      { id: 'all', label: 'ALL' },
      { id: 'strength', label: 'STRENGTH' },
      { id: 'hiit', label: 'HIIT' },
      { id: 'yoga', label: 'YOGA' },
      { id: 'weight-loss', label: 'WEIGHT LOSS' }
    ];
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
  
  get totalCoaches(): number {
    return this.trainers.length;
  }
  
  get totalMembersTrained(): number {
    return this.trainers.reduce((sum, t) => sum + t.clientsCount, 0);
  }
  
  get averageRating(): number {
    const avg = this.trainers.reduce((sum, t) => sum + t.rating, 0) / this.trainers.length;
    return Math.round(avg * 10) / 10;
  }

  viewTrainerProfile(trainerId: string) {
    this.router.navigate(['/trainers', trainerId]);
  }
}