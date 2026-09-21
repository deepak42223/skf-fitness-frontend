import { Component } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact';
import { NavbarComponent }  from '../../components/navbar/navbar';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent, ContactComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-contact></app-contact>
    </div>
  `,
})
export class ContactPageComponent {}
