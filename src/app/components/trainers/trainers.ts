import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
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
      bio: 'Passionate about helping clients achieve their peak performance through science-backed training methods.',
      rating: 4.9,
      reviewCount: 47,
      available: true,
      hourlyRate: 1500,
      instagram: 'https://instagram.com/sarahfitness',
      facebook: 'https://facebook.com/sarahfitness',
      whatsapp: '919876543210'
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      specialty: 'Powerlifting & Conditioning',
      experience: '8+ yrs',
      certifications: 'NSCA-CSCS, USA-PL',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      bio: 'Former competitive powerlifter dedicated to building strength and mental resilience in every athlete.',
      rating: 5.0,
      reviewCount: 62,
      available: true,
      hourlyRate: 2000,
      instagram: 'https://instagram.com/mikelifts',
      facebook: 'https://facebook.com/mikelifts',
      whatsapp: '919876543211'
    },
    {
      id: 'lisa',
      name: 'Lisa Patel',
      specialty: 'Yoga & Mobility',
      experience: '5+ yrs',
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
      whatsapp: '919876543212'
    },
    {
      id: 'tony',
      name: 'Tony Martinez',
      specialty: 'Boxing & Combat Sports',
      experience: '10+ yrs',
      certifications: 'USA Boxing, NASM',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      bio: 'Professional boxing coach who combines technical precision with intense conditioning for real results.',
      rating: 4.9,
      reviewCount: 54,
      available: true,
      hourlyRate: 1800,
      instagram: 'https://instagram.com/tonyboxing',
      facebook: 'https://facebook.com/tonyboxing',
      whatsapp: '919876543213'
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
  
  get filteredTrainers(): Trainer[] {
    if (this.activeFilter === 'all') {
      return this.trainers;
    }
    if (this.activeFilter === 'available') {
      return this.trainers.filter(t => t.available);
    }
    return this.trainers.filter(t => 
      t.specialty.toLowerCase().includes(this.activeFilter.toLowerCase())
    );
  }

  get filterOptions() {
    return [
      { id: 'all', label: 'All Trainers', count: this.trainers.length },
      { id: 'strength', label: 'Strength', count: this.trainers.filter(t => t.specialty.toLowerCase().includes('strength')).length },
      { id: 'hiit', label: 'HIIT', count: this.trainers.filter(t => t.specialty.toLowerCase().includes('hiit')).length },
      { id: 'yoga', label: 'Yoga', count: this.trainers.filter(t => t.specialty.toLowerCase().includes('yoga')).length },
      { id: 'boxing', label: 'Boxing', count: this.trainers.filter(t => t.specialty.toLowerCase().includes('boxing')).length },
      { id: 'available', label: 'Available Now', count: this.trainers.filter(t => t.available).length }
    ];
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  viewTrainerProfile(trainerId: string) {
    this.router.navigate(['/trainers', trainerId]);
  }
}