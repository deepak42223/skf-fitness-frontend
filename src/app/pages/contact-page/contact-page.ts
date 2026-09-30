import { Component } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact';
import { NavbarComponent }  from '../../components/navbar/navbar';
import { FooterComponent }  from '../../components/footer/footer';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent, ContactComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:60px">
      <app-contact></app-contact>
      <app-footer></app-footer>
    </div>
  `,
})
export class ContactPageComponent {}
