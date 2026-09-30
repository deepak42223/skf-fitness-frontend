import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approach.html',
  styleUrl: './approach.css'
})
export class ApproachComponent {
  
  openPhilosophy() {
    // Scroll to about section or open philosophy modal
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
