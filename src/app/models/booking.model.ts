export interface ClassBooking {
  id: number;
  memberId: number;
  classId: number;
  className: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface TrainerBooking {
  id: number;
  memberId: number;
  trainerId: number;
  trainerName: string;
  date: string;
  startTime: string;
  duration: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
}

export interface CreateClassBookingDto {
  classId: number;
  className: string;
  date: string;
  timeSlot: string;
}

export interface CreateTrainerBookingDto {
  trainerId: number;
  trainerName: string;
  date: string;
  startTime: string;
  duration: number;
  hourlyRate: number;
  notes?: string;
}
