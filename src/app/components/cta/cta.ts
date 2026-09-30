import { Component } from '@angular/core';
import { AnimatedHeadlineComponent } from '../animated-headline/animated-headline.component';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [AnimatedHeadlineComponent],
  templateUrl: './cta.html',
  styleUrl: './cta.css'
})
export class CtaComponent {}
