import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.html',
  styleUrls: ['./step-card.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StepCardComponent {
  @Input() image: string = '';
  @Input() number: string = '01';
  @Input() title: string = '';
  @Input() content: string = '';
}
