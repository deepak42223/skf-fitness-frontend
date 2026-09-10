import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  membershipPlan: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipPlan: string;
  isActive: boolean;
  joinedAt: Date;
}

export interface AuthResponse {
  message: string;
  member: AuthUser;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AuthUser | null>(null);
  isLoggedIn  = signal(false);

  constructor(private api: ApiService) {
    // Restore session on app load
    this.restoreSession();
  }

  private restoreSession() {
    const token = localStorage.getItem('skf-auth-token');
    const user  = localStorage.getItem('skf-user');
    if (token && user) {
      this.currentUser.set(JSON.parse(user));
      this.isLoggedIn.set(true);
    }
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/login', data).pipe(
      tap(res => {
        localStorage.setItem('skf-auth-token', res.token);
        localStorage.setItem('skf-user', JSON.stringify(res.member));
        this.currentUser.set(res.member);
        this.isLoggedIn.set(true);
      })
    );
  }

  register(data: RegisterData): Observable<AuthUser> {
    return this.api.post<AuthUser>('members', data);
  }

  logout() {
    localStorage.removeItem('skf-auth-token');
    localStorage.removeItem('skf-user');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  getUser(): AuthUser | null {
    return this.currentUser();
  }
}
