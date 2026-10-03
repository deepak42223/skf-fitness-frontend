import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
  }

}
