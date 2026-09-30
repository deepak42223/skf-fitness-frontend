import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.css'
})
export class CtaBannerComponent {
  
  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
  }
}
