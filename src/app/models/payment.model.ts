export interface Payment {
  id: number;
  memberId: number;
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  purpose: 'membership' | 'class' | 'trainer';
  metadata?: any;
  createdAt: Date;
  paidAt?: Date;
}

export interface CreateOrderDto {
  amount: number;
  purpose: 'membership' | 'class' | 'trainer';
  notes?: string;
  metadata?: any;
}

export interface CreateOrderResponse {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface VerifyPaymentDto {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
