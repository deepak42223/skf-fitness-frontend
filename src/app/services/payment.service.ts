import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface CreateOrderData {
  amount: number;
  purpose: 'membership' | 'class' | 'trainer' | 'other';
  metadata?: Record<string, any>;
}

export interface PaymentOrder {
  orderId: string;
  razorpayOrderId: string;
  keyId: string;
  amount: number;
  currency: string;
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

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private api: ApiService) {}

  createOrder(data: CreateOrderData): Observable<PaymentOrder> {
    return this.api.post<PaymentOrder>('payments/create-order', data);
  }

  verifyPayment(
    orderId: string,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.api.post('payments/verify', {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
  }

  openRazorpay(
    order: PaymentOrder,
    userEmail: string,
    userName: string,
  ): Observable<{ success: boolean; message: string }> {
    return new Observable((observer) => {
      const options = {
        key: order.keyId,
        amount: order.amount * 100,
        currency: order.currency,
        name: 'SKF Fitness',
        description: 'Membership Payment',
        image: '/skf-logo.jpg',
        order_id: order.razorpayOrderId,
        prefill: { email: userEmail, name: userName },
        config: {
          display: {
            blocks: {
              upi:   { name: 'Pay via UPI',   instruments: [{ method: 'upi' }] },
              other: { name: 'Other Methods', instruments: [{ method: 'card' }, { method: 'netbanking' }, { method: 'wallet' }] },
            },
            sequence: ['block.upi', 'block.other'],
            preferences: { show_default_blocks: false },
          },
        },
        theme: { color: '#2563EB' },
        handler: (response: any) => {
          this.verifyPayment(
            order.orderId,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
          ).subscribe({
            next: (res) => { observer.next(res); observer.complete(); },
            error: (err) => observer.error(err),
          });
        },
        modal: {
          ondismiss: () => {
            observer.error({ message: 'Payment cancelled by user' });
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  }

  processPayment(
    data: CreateOrderData,
    userEmail: string,
    userName: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.createOrder(data).pipe(
      switchMap((order) => this.openRazorpay(order, userEmail, userName)),
    );
  }

  getPaymentHistory(): Observable<Payment[]> {
    return this.api.get<Payment[]>('payments/my-payments');
  }
}
