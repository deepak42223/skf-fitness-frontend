import { Component, signal } from '@angular/core';

interface WorkoutFormat {
  id: string;
  name: string;
  shortName: string;
  benefits: string[];
  duration: string;
  description: string;
  image: string;
  cta: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-workout-format',
  standalone: true,
  imports: [],
  templateUrl: './workout-format.html',
  styleUrl: './workout-format.css'
})
export class WorkoutFormatComponent {
  
  workoutFormats: WorkoutFormat[] = [
    {
      id: 'strength',
      name: 'Strength Training',
      shortName: 'Strength',
      benefits: ['Build Muscle', 'Increase Strength', 'Improve Fitness'],
      duration: '50 mins',
      description: 'Build muscle, improve strength, and develop better overall fitness with guided strength workouts.',
      image: 'anastase-maragos-9dzWZQWZMdE-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'hiit',
      name: 'HIIT',
      shortName: 'HIIT',
      benefits: ['Burn Calories', 'Boost Stamina', 'Improve Conditioning'],
      duration: '45-50 mins',
      description: 'Burn calories, challenge your endurance, and improve cardiovascular fitness with high-intensity interval training.',
      image: 'ivana-cajina-rdZg6xmnpVM-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'functional',
      name: 'Functional Training',
      shortName: 'Functional',
      benefits: ['Improve Mobility', 'Build Strength', 'Move Better'],
      duration: '50 mins',
      description: 'Move better, feel stronger, and build practical fitness through dynamic full-body exercises.',
      image: 'gold-s-gym-nepal-RzI-idjc8RQ-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'cardio',
      name: 'Cardio Fitness',
      shortName: 'Cardio',
      benefits: ['Improve Endurance', 'Burn Calories', 'Boost Energy'],
      duration: '45-50 mins',
      description: 'Improve cardiovascular endurance, burn calories, and boost your energy with engaging cardio workouts.',
      image: 'danielle-cerullo-CQfNt66ttZM-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'dance',
      name: 'Dance Fitness',
      shortName: 'Dance',
      benefits: ['Have Fun', 'Burn Calories', 'Stay Active'],
      duration: '50 mins',
      description: 'Dance, move, and burn calories while improving stamina, coordination, and overall fitness.',
      image: 'lorenzo-fatto-offidani-de5OZMjb5ww-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'yoga',
      name: 'Yoga & Mobility',
      shortName: 'Yoga',
      benefits: ['Improve Flexibility', 'Reduce Stiffness', 'Relax'],
      duration: '45-50 mins',
      description: 'Improve flexibility, mobility, balance, and breathing while helping your body recover from intense training.',
      image: 'chris-kendall-sJ6az6-T1u8-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'boxing',
      name: 'Boxing Fitness',
      shortName: 'Boxing',
      benefits: ['Build Stamina', 'Improve Coordination', 'Release Stress'],
      duration: '50 mins',
      description: 'Learn fundamental boxing movements, improve conditioning, and build power through an exciting full-body workout.',
      image: 'edgar-chaparro-sHfo3WOgGTU-unsplash.jpg',
      cta: 'TRY FOR FREE'
    },
    {
      id: 'personal',
      name: 'Personal Training',
      shortName: 'Personal',
      benefits: ['Personal Goals', 'Expert Guidance', 'Faster Progress'],
      duration: 'Customized',
      description: 'Train with personalized guidance, structured workouts, and expert support to stay consistent and achieve your goals.',
      image: 'spencer-davis-0ShTs8iPY28-unsplash.jpg',
      cta: 'BOOK A SESSION'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What workout formats are available at SKF Fitness?',
      answer: 'SKF Fitness offers a variety of training formats, including Strength Training, HIIT, Functional Training, Cardio Fitness, Dance Fitness, Yoga & Mobility, Boxing Fitness, and Personal Training. Each format focuses on different fitness goals so you can choose what works best for you.'
    },
    {
      question: 'Is SKF Fitness suitable for beginners?',
      answer: 'Yes. Our workouts can be adapted to different fitness levels. Beginners can start with suitable movements and gradually increase intensity as their strength, stamina, and confidence improve.'
    },
    {
      question: 'Which workout is best for weight loss?',
      answer: 'HIIT, Cardio Fitness, and Dance Fitness can be excellent choices for increasing activity and supporting calorie burn. For the best results, combine regular exercise with a balanced diet and consistent routine.'
    },
    {
      question: 'Which workout is best for building muscle?',
      answer: 'Strength Training is the most direct option for building muscle. Regular resistance training combined with progressive increases in training intensity can help you develop strength and muscle over time.'
    },
    {
      question: 'How long is a typical SKF Fitness workout?',
      answer: 'Most group workout sessions are designed to fit within approximately 45–50 minutes, giving you enough time for warm-up, focused training, and recovery.'
    },
    {
      question: 'Can I try different workout formats?',
      answer: 'Yes. Exploring different workout formats is a great way to discover what you enjoy and what supports your fitness goals. Try different sessions and build a routine that keeps you motivated.'
    }
  ];

  expandedFaq = signal<number | null>(null);

  toggleFaq(index: number) {
    this.expandedFaq.set(this.expandedFaq() === index ? null : index);
  }
}