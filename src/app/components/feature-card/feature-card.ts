import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.html',
  styleUrls: ['./feature-card.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FeatureCardComponent {
  @Input() logo: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isStarred: boolean = false;

  cornerPositions = [
    'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
  ];
}
