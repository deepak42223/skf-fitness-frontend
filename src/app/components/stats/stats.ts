import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class StatsComponent {
  stats = [
    { value: '5,000',       label: 'SQ FT LAB',       sub: 'Acoustic Space' },
    { value: '100+',        label: 'PRECISION RIGS',   sub: 'Biomechanical Units' },
    { value: '20',          label: 'MASTER COACHES',   sub: 'Olympic Tier Staff' },
    { value: '05:00–23:00', label: 'UNRESTRICTED',     sub: '365 Operating Days' },
  ];
}
