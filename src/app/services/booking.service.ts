import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ClassBookingData {
  classId: number;
  className: string;
  date: string;
  timeSlot: string;
}

export interface TrainerBookingData {
  trainerId: number;
  trainerName: string;
  date: string;
  startTime: string;
  duration: number; // minutes
  hourlyRate: number;
  notes?: string;
}

export interface Booking {
  id: number;
  type: 'class' | 'trainer';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  date: string;
  timeSlot?: string;
  startTime?: string;
  className?: string;
  trainerName?: string;
  totalAmount?: number;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private api: ApiService) {}

  /**
   * Book a class
   */
  bookClass(data: ClassBookingData): Observable<any> {
    return this.api.post('bookings/class', data);
  }

  /**
   * Book a trainer session
   */
  bookTrainer(data: TrainerBookingData): Observable<any> {
    return this.api.post('bookings/trainer', data);
  }

  /**
   * Get user's bookings
   */
  getMyBookings(): Observable<Booking[]> {
    return this.api.get<Booking[]>('bookings/my-bookings');
  }

  /**
   * Get specific booking
   */
  getBooking(id: number): Observable<Booking> {
    return this.api.get<Booking>(`bookings/${id}`);
  }

  /**
   * Cancel booking
   */
  cancelBooking(id: number): Observable<any> {
    return this.api.delete(`bookings/${id}`);
  }
}
