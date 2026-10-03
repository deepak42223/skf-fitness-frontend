import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

export interface CreateOrderData {
  amount: number;
  purpose: 'membership' | 'class' | 'trainer' | 'other';
  metadata?: Record<string, any>;
}

export interface PaymentOrder {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface VerifyPaymentData {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface Payment {
  id: number;
  orderId: string;
  amount: number;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  purpose: string;
  createdAt: Date;
  paidAt?: Date;
}

// Razorpay types
declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private api: ApiService) {}

  /**
   * Create payment order
   */
  createOrder(data: CreateOrderData): Observable<PaymentOrder> {
    return this.api.post<PaymentOrder>('payments/create-order', data);
  }

  /**
   * Verify payment
   */
  verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): Observable<{ success: boolean; message: string }> {
    return this.api.post('payments/verify', {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    });
  }

  /**
   * Get payment history
   */
  getPaymentHistory(): Observable<Payment[]> {
    return this.api.get<Payment[]>('payments/my-payments');
  }

  /**
   * Open Razorpay checkout
   */
  openRazorpay(
    order: PaymentOrder,
    userEmail: string,
    userName: string,
  ): Observable<{ success: boolean; message: string }> {
    return new Observable((observer) => {
      const options = {
        key: order.keyId, // Use keyId from the order response
        amount: order.amount * 100, // Convert to paise
        currency: order.currency,
        name: 'SKF Fitness',
        description: 'Payment for SKF Fitness services',
        order_id: order.razorpayOrderId, // Use razorpayOrderId from backend
        prefill: {
          email: userEmail,
          name: userName,
        },
        theme: {
          color: '#2563EB',
        },
        handler: (response: any) => {
          // Payment successful
          this.verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          ).subscribe({
            next: (result) => {
              observer.next(result);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            },
          });
        },
        modal: {
          ondismiss: () => {
            observer.error({ message: 'Payment cancelled by user' });
          },
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    });
  }

  /**
   * Complete payment flow: Create order + Open Razorpay + Verify
   */
  processPayment(
    data: CreateOrderData,
    userEmail: string,
    userName: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.createOrder(data).pipe(
      switchMap((order) => this.openRazorpay(order, userEmail, userName)),
    );
  }
}
