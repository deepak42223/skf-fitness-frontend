import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
  }

}
