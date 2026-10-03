import { Component, signal } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

interface GymClass {
  id: string;
  category: 'STRENGTH' | 'HIIT' | 'YOGA' | 'BOXING' | 'CARDIO';
  name: string;
  description: string;
  trainer: string;
  trainerId: string;
  duration: string;
  level: string;
  image: string;
  rating: number;
  reviewCount: number;
  caloriesBurn: string;
  intensity: number;
  benefits: string[];
  equipment: string[];
  capacity: number;
  enrolled: number;
  days: string[];
  times: string[];
  price: number;
  isLive?: boolean;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class ClassesComponent {
  activeFilter: string = 'all';
  selectedClass: GymClass | null = null;
  bookingLoading = signal(false);
  bookingError = signal('');

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  classes: GymClass[] = [
    // STRENGTH CLASSES
    {
      id: 'strength-foundations',
      category: 'STRENGTH',
      name: 'Strength Foundations',
      description: 'Perfect for beginners looking to build a solid strength training base. Learn proper form and technique for fundamental lifts including squats, deadlifts, and presses.',
      trainer: 'Coach Arjun',
      trainerId: 'arjun',
      duration: '60 min',
      level: 'Beginner',
      image: 'ex-deadlift-ladder.jpg',
      rating: 4.7,
      reviewCount: 89,
      caloriesBurn: '300-400',
      intensity: 3,
      benefits: [
        'Build foundational strength',
        'Learn proper lifting technique',
        'Increase bone density',
        'Boost metabolism'
      ],
      equipment: ['Barbells', 'Dumbbells', 'Weight plates', 'Lifting belt'],
      capacity: 15,
      enrolled: 12,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['7:00 AM', '6:00 PM'],
      price: 500,
      isLive: false
    },
    {
      id: 'powerlifting-basics',
      category: 'STRENGTH',
      name: 'Powerlifting Basics',
      description: 'Master the big three: squat, bench press, and deadlift. Focus on progressive overload and powerlifting techniques for maximum strength gains.',
      trainer: 'Coach Mike',
      trainerId: 'mike',
      duration: '75 min',
      level: 'Intermediate',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      rating: 4.9,
      reviewCount: 124,
      caloriesBurn: '350-450',
      intensity: 4,
      benefits: [
        'Increase max strength',
        'Perfect powerlifting form',
        'Build muscle mass',
        'Improve CNS adaptation'
      ],
      equipment: ['Olympic barbell', 'Power rack', 'Bench', 'Lifting shoes'],
      capacity: 12,
      enrolled: 11,
      days: ['Tuesday', 'Thursday', 'Saturday'],
      times: ['6:00 AM', '5:00 PM'],
      price: 700,
      isLive: false
    },
    {
      id: 'hypertrophy-training',
      category: 'STRENGTH',
      name: 'Hypertrophy Training',
      description: 'Advanced muscle-building program focusing on volume, time under tension, and mind-muscle connection for maximum hypertrophy.',
      trainer: 'Coach Mike',
      trainerId: 'mike',
      duration: '90 min',
      level: 'Advanced',
      image: 'ex-deadlift-ladder.jpg',
      rating: 5.0,
      reviewCount: 67,
      caloriesBurn: '400-500',
      intensity: 5,
      benefits: [
        'Maximum muscle growth',
        'Sculpt physique',
        'Advanced techniques',
        'Break through plateaus'
      ],
      equipment: ['Cable machines', 'Dumbbells', 'Barbells', 'Resistance bands'],
      capacity: 10,
      enrolled: 10,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['5:00 PM'],
      price: 800,
      isLive: true
    },
    {
      id: 'functional-strength',
      category: 'STRENGTH',
      name: 'Functional Strength',
      description: 'Build real-world strength through compound movements and functional training patterns that translate to everyday life.',
      trainer: 'Coach Arjun',
      trainerId: 'arjun',
      duration: '60 min',
      level: 'Intermediate',
      image: 'ex-deadlift-ladder.jpg',
      rating: 4.8,
      reviewCount: 103,
      caloriesBurn: '350-450',
      intensity: 4,
      benefits: [
        'Improve daily movement',
        'Prevent injuries',
        'Build core stability',
        'Enhance athleticism'
      ],
      equipment: ['Kettlebells', 'TRX', 'Medicine balls', 'Plyo boxes'],
      capacity: 16,
      enrolled: 13,
      days: ['Tuesday', 'Thursday'],
      times: ['7:00 AM', '6:30 PM'],
      price: 550,
      isLive: false
    },

    // HIIT CLASSES
    {
      id: 'hiit-bootcamp',
      category: 'HIIT',
      name: 'HIIT Bootcamp',
      description: 'High-intensity interval training for beginners. Short bursts of intense exercise followed by recovery periods. Burn fat and build endurance.',
      trainer: 'Coach Priya',
      trainerId: 'priya',
      duration: '30 min',
      level: 'Beginner',
      image: 'anastase-maragos-7kEpUPB8vNk-unsplash.jpg',
      rating: 4.6,
      reviewCount: 156,
      caloriesBurn: '350-500',
      intensity: 4,
      benefits: [
        'Burn fat quickly',
        'Boost cardiovascular fitness',
        'Efficient 30-min workout',
        'Increase metabolic rate'
      ],
      equipment: ['Yoga mat', 'Water bottle', 'Towel'],
      capacity: 25,
      enrolled: 22,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['6:00 AM', '12:00 PM', '7:00 PM'],
      price: 400,
      isLive: true
    },
    {
      id: 'redline-hiit',
      category: 'HIIT',
      name: 'Redline HIIT',
      description: 'Push your limits with this advanced HIIT class. Maximum intensity intervals designed for experienced athletes ready to go all out.',
      trainer: 'Coach Sarah',
      trainerId: 'sarah',
      duration: '45 min',
      level: 'Advanced',
      image: 'anastase-maragos-7kEpUPB8vNk-unsplash.jpg',
      rating: 4.9,
      reviewCount: 201,
      caloriesBurn: '600-800',
      intensity: 5,
      benefits: [
        'Maximum calorie burn',
        'Elite conditioning',
        'Mental toughness',
        'Athletic performance'
      ],
      equipment: ['Assault bike', 'Rower', 'Jump rope', 'Battle ropes'],
      capacity: 20,
      enrolled: 18,
      days: ['Tuesday', 'Thursday', 'Saturday'],
      times: ['6:00 AM', '5:30 PM'],
      price: 600,
      isLive: true
    },
    {
      id: 'tabata-blast',
      category: 'HIIT',
      name: 'Tabata Blast',
      description: '20 seconds of all-out effort followed by 10 seconds of rest. Eight rounds of pure intensity. Get in, work hard, get out.',
      trainer: 'Coach Priya',
      trainerId: 'priya',
      duration: '40 min',
      level: 'Intermediate',
      image: 'anastase-maragos-7kEpUPB8vNk-unsplash.jpg',
      rating: 4.7,
      reviewCount: 143,
      caloriesBurn: '500-650',
      intensity: 4,
      benefits: [
        'Time-efficient training',
        'Explosive power',
        'Fat loss',
        'Improved VO2 max'
      ],
      equipment: ['Dumbbells', 'Kettlebells', 'Box', 'Mat'],
      capacity: 20,
      enrolled: 16,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['12:30 PM', '6:00 PM'],
      price: 500,
      isLive: false
    },
    {
      id: 'amrap-challenge',
      category: 'HIIT',
      name: 'AMRAP Challenge',
      description: 'As Many Rounds As Possible. Race against the clock and yourself. Every class is a personal best challenge.',
      trainer: 'Coach Sarah',
      trainerId: 'sarah',
      duration: '50 min',
      level: 'Advanced',
      image: 'anastase-maragos-7kEpUPB8vNk-unsplash.jpg',
      rating: 4.8,
      reviewCount: 98,
      caloriesBurn: '550-700',
      intensity: 5,
      benefits: [
        'Competitive environment',
        'Track progress',
        'Full-body workout',
        'Community motivation'
      ],
      equipment: ['Barbell', 'Pull-up bar', 'Rower', 'Wall ball'],
      capacity: 18,
      enrolled: 15,
      days: ['Tuesday', 'Thursday'],
      times: ['5:00 PM', '7:00 PM'],
      price: 600,
      isLive: false
    },

    // YOGA CLASSES
    {
      id: 'hatha-yoga',
      category: 'YOGA',
      name: 'Hatha Yoga',
      description: 'Traditional yoga practice focusing on breath, postures, and meditation. Perfect for beginners seeking balance and flexibility.',
      trainer: 'Coach Lisa',
      trainerId: 'lisa',
      duration: '60 min',
      level: 'Beginner',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      rating: 4.9,
      reviewCount: 187,
      caloriesBurn: '150-250',
      intensity: 2,
      benefits: [
        'Improve flexibility',
        'Reduce stress',
        'Better posture',
        'Mind-body connection'
      ],
      equipment: ['Yoga mat', 'Blocks', 'Strap', 'Blanket'],
      capacity: 20,
      enrolled: 17,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['7:00 AM', '6:30 PM'],
      price: 400,
      isLive: false
    },
    {
      id: 'power-yoga',
      category: 'YOGA',
      name: 'Power Yoga',
      description: 'Dynamic, fitness-based vinyasa practice. Build strength and flexibility through flowing sequences and challenging poses.',
      trainer: 'Coach Lisa',
      trainerId: 'lisa',
      duration: '75 min',
      level: 'Intermediate',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      rating: 4.8,
      reviewCount: 134,
      caloriesBurn: '300-400',
      intensity: 3,
      benefits: [
        'Build lean muscle',
        'Increase flexibility',
        'Cardiovascular health',
        'Mental clarity'
      ],
      equipment: ['Yoga mat', 'Towel', 'Water bottle'],
      capacity: 18,
      enrolled: 15,
      days: ['Tuesday', 'Thursday', 'Saturday'],
      times: ['8:00 AM', '5:00 PM'],
      price: 500,
      isLive: false
    },
    {
      id: 'yin-yoga',
      category: 'YOGA',
      name: 'Yin Yoga & Stretch',
      description: 'Slow-paced style with poses held for longer periods. Deep stretch for connective tissue and passive approach to recovery.',
      trainer: 'Coach Lisa',
      trainerId: 'lisa',
      duration: '45 min',
      level: 'All Levels',
      image: 'charles-gaudreault-xXofYCc3hqc-unsplash.jpg',
      rating: 5.0,
      reviewCount: 92,
      caloriesBurn: '100-150',
      intensity: 1,
      benefits: [
        'Deep tissue release',
        'Recovery enhancement',
        'Stress relief',
        'Improved mobility'
      ],
      equipment: ['Yoga mat', 'Bolster', 'Blocks', 'Eye pillow'],
      capacity: 15,
      enrolled: 12,
      days: ['Sunday'],
      times: ['9:00 AM', '7:00 PM'],
      price: 450,
      isLive: false
    },

    // BOXING CLASSES
    {
      id: 'boxing-fundamentals',
      category: 'BOXING',
      name: 'Boxing Fundamentals',
      description: 'Learn the sweet science from scratch. Proper stance, footwork, and punching technique in a supportive environment.',
      trainer: 'Coach Tony',
      trainerId: 'tony',
      duration: '50 min',
      level: 'Beginner',
      image: 'boxing-wf.jpg',
      rating: 4.7,
      reviewCount: 112,
      caloriesBurn: '400-550',
      intensity: 3,
      benefits: [
        'Learn self-defense',
        'Stress relief',
        'Coordination',
        'Confidence building'
      ],
      equipment: ['Boxing gloves', 'Hand wraps', 'Mouthguard (optional)'],
      capacity: 16,
      enrolled: 14,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['6:00 PM', '7:30 PM'],
      price: 550,
      isLive: false
    },
    {
      id: 'combat-conditioning',
      category: 'BOXING',
      name: 'Combat Conditioning',
      description: 'Fighter-level conditioning combining boxing drills with high-intensity cardio. Build endurance like a pro athlete.',
      trainer: 'Coach Tony',
      trainerId: 'tony',
      duration: '60 min',
      level: 'Intermediate',
      image: 'boxing-wf.jpg',
      rating: 4.9,
      reviewCount: 87,
      caloriesBurn: '600-750',
      intensity: 5,
      benefits: [
        'Elite conditioning',
        'Explosive power',
        'Mental toughness',
        'Fat burning'
      ],
      equipment: ['Heavy bag', 'Speed bag', 'Jump rope', 'Gloves'],
      capacity: 14,
      enrolled: 12,
      days: ['Tuesday', 'Thursday'],
      times: ['6:00 PM'],
      price: 650,
      isLive: false
    },
    {
      id: 'fighter-training',
      category: 'BOXING',
      name: 'Fighter Training',
      description: 'Advanced boxing for competitive athletes. Sparring, advanced combinations, and fight strategy. Coach approval required.',
      trainer: 'Coach Tony',
      trainerId: 'tony',
      duration: '75 min',
      level: 'Advanced',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      rating: 5.0,
      reviewCount: 43,
      caloriesBurn: '700-900',
      intensity: 5,
      benefits: [
        'Competition preparation',
        'Advanced techniques',
        'Sparring experience',
        'Ring IQ development'
      ],
      equipment: ['Full boxing gear', 'Headgear', 'Sparring gloves', 'Mouthguard'],
      capacity: 8,
      enrolled: 7,
      days: ['Saturday'],
      times: ['4:00 PM'],
      price: 800,
      isLive: false
    },

    // CARDIO CLASSES
    {
      id: 'spin-class',
      category: 'CARDIO',
      name: 'Spin Class',
      description: 'Indoor cycling class with music, resistance changes, and motivating coaching. Ride to the beat and burn serious calories.',
      trainer: 'Coach Sneha',
      trainerId: 'sneha',
      duration: '45 min',
      level: 'All Levels',
      image: 'ex-treadmill-intervals.jpg',
      rating: 4.8,
      reviewCount: 203,
      caloriesBurn: '500-700',
      intensity: 4,
      benefits: [
        'Low-impact cardio',
        'Leg strength',
        'Endurance building',
        'Music-driven motivation'
      ],
      equipment: ['Cycling shoes (optional)', 'Water bottle', 'Towel'],
      capacity: 25,
      enrolled: 23,
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['6:00 AM', '12:00 PM', '6:00 PM'],
      price: 450,
      isLive: true
    },
    {
      id: 'treadmill-intervals',
      category: 'CARDIO',
      name: 'Treadmill Intervals',
      description: 'Run-walk intervals designed to build cardiovascular endurance. Perfect for improving running speed and stamina.',
      trainer: 'Coach Sneha',
      trainerId: 'sneha',
      duration: '40 min',
      level: 'Intermediate',
      image: 'ex-treadmill-intervals.jpg',
      rating: 4.6,
      reviewCount: 76,
      caloriesBurn: '400-550',
      intensity: 4,
      benefits: [
        'Improve running speed',
        'Build endurance',
        'Structured progression',
        'Running form coaching'
      ],
      equipment: ['Running shoes', 'Heart rate monitor (optional)'],
      capacity: 12,
      enrolled: 9,
      days: ['Tuesday', 'Thursday'],
      times: ['6:30 AM', '5:30 PM'],
      price: 400,
      isLive: false
    },
    {
      id: 'endurance-training',
      category: 'CARDIO',
      name: 'Endurance Training',
      description: 'Long-form cardio combining multiple modalities. Build aerobic base and mental resilience through sustained effort.',
      trainer: 'Coach Sneha',
      trainerId: 'sneha',
      duration: '60 min',
      level: 'Advanced',
      image: 'ex-treadmill-intervals.jpg',
      rating: 4.7,
      reviewCount: 54,
      caloriesBurn: '600-800',
      intensity: 4,
      benefits: [
        'Aerobic capacity',
        'Fat burning',
        'Mental endurance',
        'Marathon prep'
      ],
      equipment: ['Heart rate monitor', 'Comfortable shoes', 'Hydration pack'],
      capacity: 15,
      enrolled: 11,
      days: ['Saturday'],
      times: ['7:00 AM'],
      price: 500,
      isLive: false
    }
  ];

  get filteredClasses(): GymClass[] {
    if (this.activeFilter === 'all') {
      return this.classes;
    }
    return this.classes.filter(c => 
      c.category.toLowerCase() === this.activeFilter.toLowerCase()
    );
  }

  get filterOptions() {
    return [
      { id: 'all', label: 'All Classes', count: this.classes.length },
      { id: 'strength', label: 'Strength', count: this.classes.filter(c => c.category === 'STRENGTH').length },
      { id: 'hiit', label: 'HIIT', count: this.classes.filter(c => c.category === 'HIIT').length },
      { id: 'yoga', label: 'Yoga', count: this.classes.filter(c => c.category === 'YOGA').length },
      { id: 'boxing', label: 'Boxing', count: this.classes.filter(c => c.category === 'BOXING').length },
      { id: 'cardio', label: 'Cardio', count: this.classes.filter(c => c.category === 'CARDIO').length }
    ];
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getLevelColor(level: string): string {
    if (level === 'Advanced') return '#EF4444';
    if (level === 'Intermediate') return '#F4A623';
    if (level === 'All Levels') return '#10B981';
    return '#12E0C4';
  }

  getCategoryColor(category: string): string {
    const colors: {[key: string]: string} = {
      'STRENGTH': '#2563EB',
      'HIIT': '#EF4444',
      'YOGA': '#8B5CF6',
      'BOXING': '#F59E0B',
      'CARDIO': '#10B981'
    };
    return colors[category] || '#666666';
  }

  getSpotsFilled(gymClass: GymClass): number {
    return Math.round((gymClass.enrolled / gymClass.capacity) * 100);
  }

  isAlmostFull(gymClass: GymClass): boolean {
    return this.getSpotsFilled(gymClass) >= 80;
  }

  openClassDetail(gymClass: GymClass) {
    this.selectedClass = gymClass;
  }

  closeClassDetail() {
    this.selectedClass = null;
  }

  bookClass(gymClass: GymClass) {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      // Open auth modal
      window.dispatchEvent(new CustomEvent('open-auth-modal', {
        detail: { tab: 'login', classId: gymClass.id }
      }));
      return;
    }

    // TODO: Open booking modal for date/time selection
    // For now, book for tomorrow at first available time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    this.bookingLoading.set(true);
    this.bookingError.set('');

    const bookingData = {
      classId: parseInt(gymClass.id.split('-')[0]) || 1, // Extract numeric ID
      className: gymClass.name,
      date: dateStr,
      timeSlot: gymClass.times[0] || '6:00 AM',
    };

    this.bookingService.bookClass(bookingData).subscribe({
      next: (result) => {
        this.bookingLoading.set(false);
        alert(`✅ ${gymClass.name} booked successfully for ${dateStr} at ${bookingData.timeSlot}!`);
        this.closeClassDetail();
      },
      error: (err) => {
        this.bookingLoading.set(false);
        const errorMsg = err?.error?.message || 'Booking failed. Please try again.';
        this.bookingError.set(errorMsg);
        alert(`❌ ${errorMsg}`);
      }
    });
  }
}