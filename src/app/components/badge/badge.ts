import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.html',
  styleUrls: ['./badge.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BadgeComponent {
  @Input() title: string = '';
  @Input() animated: boolean = true;
}
