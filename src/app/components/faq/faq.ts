import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent {
  activeId = signal<number | null>(null);
  searchQuery = signal('');
  selectedCategory = signal('all');

  categories = ['all', 'membership', 'classes', 'training', 'facilities'];

  faqs: FAQ[] = [
    {
      id: 1,
      category: 'membership',
      question: 'What membership plans do you offer?',
      answer: 'We offer Basic (₹999/month), Pro (₹1,799/month), and Elite (₹2,999/month) plans. Each includes different levels of access to classes, personal training sessions, and facilities.'
    },
    {
      id: 2,
      category: 'membership',
      question: 'Can I freeze my membership?',
      answer: 'Yes, you can freeze your membership for up to 2 months per year. Simply contact us 7 days before your freeze period. No fees apply for the first freeze.'
    },
    {
      id: 3,
      category: 'classes',
      question: 'How do I book a class?',
      answer: 'Log in to your member portal, go to the Classes section, and select your preferred time slot. You can book up to 7 days in advance. Cancellations must be made 4 hours prior.'
    },
    {
      id: 4,
      category: 'training',
      question: 'Do you offer personal training?',
      answer: 'Yes! All our plans include personal training sessions. Basic: 2/month, Pro: 4/month, Elite: 8/month. Additional sessions can be purchased separately.'
    },
    {
      id: 5,
      category: 'facilities',
      question: 'What are your operating hours?',
      answer: 'We are open Monday-Saturday: 5:00 AM - 11:00 PM, Sunday: 6:00 AM - 9:00 PM. Elite members have 24/7 access with key card.'
    },
    {
      id: 6,
      category: 'membership',
      question: 'Is there a joining fee?',
      answer: 'First-time members pay a one-time registration fee of ₹1,000. This covers your access card, locker assignment, and initial fitness assessment.'
    },
    {
      id: 7,
      category: 'classes',
      question: 'What types of classes do you offer?',
      answer: 'We offer HIIT, Yoga, Zumba, Spin, Boxing, CrossFit, and more. Check our schedule for specific class times and instructor details.'
    },
    {
      id: 8,
      category: 'facilities',
      question: 'Do you have parking?',
      answer: 'Yes, we have free parking for all members with 50+ spaces. Bike parking and EV charging stations are also available.'
    }
  ];

  get filteredFaqs() {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();
    
    return this.faqs.filter(faq => {
      const matchesCategory = category === 'all' || faq.category === category;
      const matchesSearch = !query || 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }

  toggle(id: number) {
    this.activeId.set(this.activeId() === id ? null : id);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  updateSearch(value: string) {
    this.searchQuery.set(value);
  }
}