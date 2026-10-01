import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.html',
  styleUrls: ['./testimonial-card.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TestimonialCardComponent {
  @Input() poster: string = '';
  @Input() content: string = '';
  @Input() name: string = '';
  @Input() designation: string = '';
  @Input() video?: string;

  isPlaying = signal(false);

  togglePlay(videoElement: HTMLVideoElement) {
    if (this.isPlaying()) {
      videoElement.pause();
      this.isPlaying.set(false);
    } else {
      videoElement.play();
      this.isPlaying.set(true);
    }
  }
}
