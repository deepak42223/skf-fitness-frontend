import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  form: ContactForm = {
    name: '', email: '', phone: '', subject: '', message: ''
  };

  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  errorMsg = signal('');

  info = [
    { icon: '📍', label: 'Address', value: '124 Iron Street, Hyderabad, Telangana 500001' },
    { icon: '📞', label: 'Phone',   value: '+91 88857 35911' },
    { icon: '✉️',  label: 'Email',  value: 'hello@skffitness.com' },
    { icon: '🕐', label: 'Hours',   value: 'Mon–Sat: 5AM–11PM  |  Sun: 7AM–9PM' },
  ];

  constructor(private api: ApiService) {}

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.phone || !this.form.message) return;

    this.status.set('loading');
    this.errorMsg.set('');

    this.api.post<{ message: string }>('contact', this.form).subscribe({
      next: () => {
        this.status.set('success');
        this.form = { name: '', email: '', phone: '', subject: '', message: '' };
        setTimeout(() => this.status.set('idle'), 5000);
      },
      error: (err) => {
        this.status.set('error');
        this.errorMsg.set(err?.error?.message ?? 'Something went wrong. Please try again.');
        setTimeout(() => this.status.set('idle'), 5000);
      }
    });
  }

  get isLoading() { return () => this.status() === 'loading'; }
  get isSuccess() { return () => this.status() === 'success'; }
  get isError()   { return () => this.status() === 'error'; }
}
