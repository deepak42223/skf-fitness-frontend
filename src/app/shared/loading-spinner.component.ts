import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-spinner" [class.inline]="inline">
      <div class="spinner"></div>
      @if (message) {
        <p class="loading-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .loading-spinner.inline {
      padding: 0.5rem;
      display: inline-flex;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(37, 99, 235, 0.1);
      border-top-color: #2563EB;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .loading-spinner.inline .spinner {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-message {
      margin-top: 1rem;
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = '';
  @Input() inline = false;
}