import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ProfileData {
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  fitness_goal?: string;
  experience?: string;
  health_notes?: string;
  emergency_contact?: string;
  emergency_phone?: string;
}

export interface ProgressEntry {
  date: string;
  weight_kg?: number;
  body_fat?: number;
  muscle_mass?: number;
  notes?: string;
}

export interface ProfileStats {
  totalSessions: number;
  sessionsThisMonth: number;
  currentWeight: number | null;
  currentBodyFat: number | null;
  lastCheckIn: string | null;
}

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  constructor(private api: ApiService) {}

  getProfile(userId: number): Observable<ProfileData> {
    return this.api.get<ProfileData>(`profile/${userId}`);
  }

  updateProfile(userId: number, data: ProfileData): Observable<ProfileData> {
    return this.api.patch<ProfileData>(`profile/${userId}`, data);
  }

  getStats(userId: number): Observable<ProfileStats> {
    return this.api.get<ProfileStats>(`profile/${userId}/stats`);
  }

  getProgress(userId: number): Observable<ProgressEntry[]> {
    return this.api.get<ProgressEntry[]>(`profile/${userId}/progress`);
  }

  addProgress(userId: number, data: ProgressEntry): Observable<ProgressEntry> {
    return this.api.post<ProgressEntry>(`profile/${userId}/progress`, data);
  }

  getAttendance(userId: number): Observable<object[]> {
    return this.api.get<object[]>(`profile/${userId}/attendance`);
  }

  checkIn(userId: number): Observable<object> {
    return this.api.post<object>(`profile/${userId}/checkin`, {});
  }

  checkOut(userId: number): Observable<object> {
    return this.api.post<object>(`profile/${userId}/checkout`, {});
  }
}
