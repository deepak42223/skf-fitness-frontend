import { Component, OnInit, signal } from '@angular/core';
import { AnimatedHeadlineComponent } from '../animated-headline/animated-headline.component';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
}

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [AnimatedHeadlineComponent],
  templateUrl: './membership.html',
  styleUrl: './membership.css'
})
export class MembershipComponent implements OnInit {
  loading = signal(true);
  paymentLoading = signal(false);

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 999,
      description: 'Perfect for getting started on your fitness journey',
      features: [
        'Gym access (6AM - 10PM)',
        'Cardio & strength equipment',
        'Locker room access',
        'Free fitness assessment'
      ],
      featured: false,
      cta: 'Get Membership'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 1799,
      description: 'Most popular plan with everything you need to succeed',
      features: [
        'All Basic features',
        '24/7 gym access',
        'All group classes included',
        '2 personal training sessions',
        'Nutrition consultation'
      ],
      featured: true,
      cta: 'Get Membership'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 2999,
      description: 'Ultimate package for serious fitness enthusiasts',
      features: [
        'All Pro features',
        'Unlimited personal training',
        'Custom meal plans',
        'Recovery sessions',
        'Priority class booking'
      ],
      featured: false,
      cta: 'Get Membership'
    }
  ];

  ngOnInit() {
    // Simulate loading delay
    setTimeout(() => {
      this.loading.set(false);
    }, 1200);
  }

  selectPlan(planId: string) {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) return;

    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      // Open auth modal with plan pre-selected
      window.dispatchEvent(new CustomEvent('open-auth-modal', {
        detail: { tab: 'register', plan: planId }
      }));
      return;
    }

    // User is logged in, proceed to payment
    const user = this.authService.getUser();
    if (!user) return;

    this.paymentLoading.set(true);

    const paymentData = {
      amount: plan.price,
      purpose: 'membership' as const,
      metadata: {
        planId: plan.id,
        planName: plan.name,
      },
    };

    this.paymentService.processPayment(
      paymentData,
      user.email,
      user.name
    ).subscribe({
      next: (result) => {
        this.paymentLoading.set(false);
        alert(`✅ Payment successful! Your ${plan.name} membership is now active.`);
        // TODO: Redirect to profile or show confirmation page
      },
      error: (err) => {
        this.paymentLoading.set(false);
        const errorMsg = err?.message || 'Payment failed. Please try again.';
        alert(`❌ ${errorMsg}`);
      }
    });
  }
}