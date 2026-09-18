import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Dispatch open-auth-modal event so the login modal appears
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'login' } }));
    return false;
  }
}
