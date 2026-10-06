import { Component } from '@angular/core';
import { MembershipComponent } from '../../components/membership/membership';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-membership-page',
  standalone: true,
  imports: [NavbarComponent, MembershipComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top:64px">
      <app-membership></app-membership>
      <app-footer></app-footer>
    </div>
  `,
})
export class MembershipPageComponent {}
