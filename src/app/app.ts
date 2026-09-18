import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { RouterOutlet }           from '@angular/router';
import { NavbarComponent }        from './components/navbar/navbar';
import { HeroComponent }          from './components/hero/hero';
import { TaglineComponent }       from './components/tagline/tagline';
import { CategoriesComponent }    from './components/categories/categories';
import { AboutComponent }         from './components/about/about';
import { FeaturesComponent }      from './components/features/features';
import { ServicesComponent }      from './components/services/services';
import { WorkoutFormatComponent } from './components/workout-format/workout-format';
import { MembershipComponent }    from './components/membership/membership';
import { TrainersComponent }      from './components/trainers/trainers';
import { ExercisesComponent }     from './components/exercises/exercises';
import { TestimonialsComponent }  from './components/testimonials/testimonials';
import { ContactComponent }       from './components/contact/contact';
import { CtaComponent }           from './components/cta/cta';
import { FooterComponent }        from './components/footer/footer';
import { UserProfileComponent }   from './components/user-profile/user-profile';
import { AuthService }            from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    TaglineComponent,
    CategoriesComponent,
    AboutComponent,
    FeaturesComponent,
    ServicesComponent,
    WorkoutFormatComponent,
    MembershipComponent,
    TrainersComponent,
    ExercisesComponent,
    TestimonialsComponent,
    ContactComponent,
    CtaComponent,
    FooterComponent,
    UserProfileComponent,
  ],
  template: `
    <div class="page-progress" [style.width]="scrollProgress() + '%'"></div>

    <app-navbar></app-navbar>

    <!-- Routed pages (e.g. /workouts/:id) render here -->
    <router-outlet></router-outlet>

    <!-- Show Profile Page if logged in, else show main website -->
    @if (authService.isLoggedIn() && showProfile()) {
      <app-user-profile (onLogout)="handleLogout()"></app-user-profile>
    } @else {
      <app-hero></app-hero>
      <app-tagline></app-tagline>
      <app-categories></app-categories>
      <app-about></app-about>
      <app-features></app-features>
      <app-services></app-services>
      <app-workout-format></app-workout-format>
      <app-membership></app-membership>
      <app-trainers></app-trainers>
      <app-exercises></app-exercises>
      <app-testimonials></app-testimonials>
      <app-contact></app-contact>
      <app-cta></app-cta>
      <app-footer></app-footer>
    }

    <!-- Auth Modal — Animated Login Page Style -->
    @if (showAuthModal()) {
      <div class="auth-overlay" (click)="closeModal()">
        <div class="auth-modal-wrap" (click)="$event.stopPropagation()">

          <!-- Rotating bars -->
          <div class="circle-container">
            @for (bar of animBars; track bar.angle) {
              <div class="anim-bar" [class.active]="bar.active"
                [style.transform]="'rotate(' + bar.angle + 'deg) translateY(-170px)'">
              </div>
            }
          </div>

          <!-- Login box -->
          <div class="login-box">
            <button class="auth-close" (click)="closeModal()">✕</button>

            <div class="auth-logo-area">
              <img src="skf-logo-new.jpg" alt="SKF" class="auth-logo" width="52" height="52" />
            </div>

            <div class="auth-tabs">
              <button class="auth-tab" [class.active]="authTab()==='login'"    (click)="authTab.set('login')">Login</button>
              <button class="auth-tab" [class.active]="authTab()==='register'" (click)="authTab.set('register')">Register</button>
            </div>

            @if (authTab() === 'forgot') {
              <form class="auth-form" (ngSubmit)="forgotPassword()">
                <p style="color:#aabbcc;font-size:0.85rem;margin:0 0 0.5rem">Enter your email and we'll send a reset link.</p>
                <div class="input-group">
                  <input type="email" [(ngModel)]="forgotEmail" name="forgotEmail" placeholder="Your email address" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                </div>
                @if (authError())   { <div class="auth-error">{{ authError() }}</div> }
                @if (authSuccess()) { <div class="auth-success">{{ authSuccess() }}</div> }
                <button type="submit" class="login-btn" [disabled]="authLoading()">
                  {{ authLoading() ? 'SENDING...' : 'SEND RESET LINK' }}
                </button>
              </form>
              <div class="signup-link"><a (click)="authTab.set('login')" style="cursor:pointer">Back to Login</a></div>
            }

            @if (authTab() === 'login') {
              <form class="auth-form" (ngSubmit)="login()">
                <div class="input-group">
                  <input type="email" [(ngModel)]="loginEmail" name="email" placeholder="Email" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                </div>
                <div class="input-group">
                  <input type="password" [(ngModel)]="loginPassword" name="password" placeholder="Password" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                </div>
                <div class="forgot-password"><a (click)="authTab.set('forgot')" style="cursor:pointer">Forgot your password?</a></div>
                @if (authError()) { <div class="auth-error">{{ authError() }}</div> }
                <button type="submit" class="login-btn" [disabled]="authLoading()">
                  {{ authLoading() ? 'SIGNING IN...' : 'LOGIN' }}
                </button>
              </form>
              <div class="signup-link"><a (click)="authTab.set('register')" style="cursor:pointer">Sign Up</a></div>
            }

            @if (authTab() === 'register') {
              <form class="auth-form" (ngSubmit)="register()">
                <div class="input-group">
                  <input type="text" [(ngModel)]="regName" name="name" placeholder="Full Name" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                </div>
                <div class="input-group">
                  <input type="tel" [(ngModel)]="regPhone" name="phone" placeholder="Phone number" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a2 2 0 0 1 1.97-2.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg></span>
                </div>
                <div class="input-group">
                  <input type="email" [(ngModel)]="regEmail" name="email" placeholder="Email" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                </div>
                <div class="input-group">
                  <input type="password" [(ngModel)]="regPassword" name="password" placeholder="Password (min 6 chars)" required />
                  <span class="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                </div>
                <div class="input-group select-wrap">
                  <select [(ngModel)]="regPlan" name="plan">
                    <option value="basic">Basic — ₹999/month</option>
                    <option value="pro">Pro — ₹1,799/month</option>
                    <option value="elite">Elite — ₹2,999/month</option>
                  </select>
                </div>
                @if (authError())   { <div class="auth-error">{{ authError() }}</div> }
                @if (authSuccess()) { <div class="auth-success">{{ authSuccess() }}</div> }
                <button type="submit" class="login-btn" [disabled]="authLoading()">
                  {{ authLoading() ? 'CREATING...' : 'CREATE ACCOUNT' }}
                </button>
              </form>
              <div class="signup-link"><a (click)="authTab.set('login')" style="cursor:pointer">Already a member? Login</a></div>
            }

          </div>
        </div>
      </div>
    }

    <!-- Floating Action Buttons -->

    <button
      class="scroll-top-btn"
      [class.visible]="showScrollTop()"
      (click)="scrollToTop()"
      aria-label="Scroll to top">
      ↑
    </button>

    <!-- WhatsApp FAB -->
    <a
      href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20joining%20SKF%20Fitness!"
      target="_blank"
      rel="noopener"
      class="whatsapp-fab"
      aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
    </a>
  `,
  styles: [`

    /* ══════════════════════════════
       AUTH MODAL — Animated Login
       ══════════════════════════════ */

    .auth-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.85);
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(6px);
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    /* Wrap holds the rotating circle + box together */
    .auth-modal-wrap {
      position: relative;
      width: 340px; height: 340px;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── Rotating bars ── */
    .circle-container {
      position: absolute;
      width: 100%; height: 100%;
      animation: rotateBars 20s linear infinite;
    }
    @keyframes rotateBars {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .anim-bar {
      position: absolute;
      width: 7px; height: 32px;
      background: #2d3e50;
      border-radius: 4px;
      top: 0; left: 50%;
      transform-origin: center 170px;
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .anim-bar.active {
      background: linear-gradient(180deg, #12E0C4, #2E9BFF);
      box-shadow: 0 0 18px rgba(18,224,196,0.85);
    }

    /* ── Login box ── */
    .login-box {
      position: relative;
      z-index: 10;
      background: rgba(27, 32, 48, 0.98);
      border: 1px solid rgba(46,155,255,0.25);
      padding: 28px 32px 24px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.7),
                  0 0 40px rgba(46,155,255,0.08);
      width: 380px;
      max-height: 92vh;
      overflow-y: auto;
    }

    .auth-close {
      position: absolute; top: 0.85rem; right: 0.85rem;
      background: none; border: none;
      color: #666; font-size: 1.1rem; cursor: pointer;
      width: 30px; height: 30px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .auth-close:hover { background: rgba(255,255,255,0.1); color:#fff; }

    .auth-logo-area { text-align:center; margin-bottom: 1rem; }
    .auth-logo { height: 52px; object-fit: contain; }

    /* Tabs */
    .auth-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 1.25rem;
    }
    .auth-tab {
      flex:1; background:none; border:none;
      border-bottom: 2px solid transparent;
      padding: 0.6rem 0; color: #555;
      font-weight: 700; font-size: 0.8rem;
      cursor: pointer; text-transform: uppercase;
      letter-spacing: 1px; transition: all 0.2s;
    }
    .auth-tab.active { color: #2E9BFF; border-bottom-color: #2E9BFF; }
    .auth-tab:hover  { color: #aaa; }

    /* Form */
    .auth-form {
      display: flex; flex-direction: column; gap: 0.9rem;
      margin-bottom: 0.5rem;
    }

    /* Input group */
    .input-group {
      position: relative;
    }
    .input-group input {
      width: 100%;
      padding: 11px 40px 11px 16px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 25px;
      color: #fff; font-size: 0.88rem;
      outline: none; transition: all 0.3s ease;
      font-family: inherit;
    }
    .input-group input:focus {
      border-color: #2E9BFF;
      box-shadow: 0 0 14px rgba(46,155,255,0.25);
    }
    .input-group input::placeholder { color: rgba(255,255,255,0.4); }
    .input-icon {
      position: absolute; right: 14px; top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    /* Select wrap */
    .select-wrap select {
      width: 100%;
      padding: 11px 16px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 25px;
      color: #fff; font-size: 0.88rem;
      outline: none; cursor: pointer;
      font-family: inherit;
    }
    .select-wrap select option { background: #1a2636; }

    /* Forgot password */
    .forgot-password { text-align: right; margin-top: -4px; }
    .forgot-password a {
      color: rgba(255,255,255,0.45); font-size: 0.75rem;
      text-decoration: none; transition: color 0.2s;
    }
    .forgot-password a:hover { color: #3498DB; }

    /* Login button — blue gradient pill */
    .login-btn {
      width: 100%;
      padding: 13px;
      background: linear-gradient(135deg, #1668C2, #2E9BFF);
      border: none; border-radius: 25px;
      color: #fff; font-size: 0.9rem;
      font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; cursor: pointer;
      transition: all 0.3s ease;
      position: relative; overflow: hidden;
      font-family: inherit;
    }
    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(46,155,255,0.5);
    }
    .login-btn:disabled { opacity: 0.55; cursor: not-allowed; }

    /* Social login */
    .social-login { text-align:center; margin-top: 1rem; }
    .social-login p { color: rgba(255,255,255,0.45); font-size: 0.78rem; margin-bottom: 0.75rem; }
    .social-icons-row { display:flex; justify-content:center; gap: 12px; }
    .social-icon {
      width: 38px; height: 38px; border-radius: 50%;
      display: flex; align-items:center; justify-content:center;
      cursor: pointer; font-size: 1rem; color:#fff; font-weight:700;
      transition: all 0.3s ease;
    }
    .social-icon:hover { transform: translateY(-4px) scale(1.1); box-shadow: 0 8px 18px rgba(0,0,0,0.4); }
    .social-icon.facebook { background: #3b5998; }
    .social-icon.twitter  { background: #111; }
    .social-icon.google   { background: #db4437; }

    /* Signup link */
    .signup-link { text-align:center; margin-top: 1rem; }
    .signup-link a { color: #3498DB; font-size:0.82rem; font-weight:600; text-decoration:none; transition: color 0.2s; }
    .signup-link a:hover { color: #64B5F6; text-decoration: underline; }

    /* Feedback */
    .auth-error {
      background: rgba(231,76,60,0.12); border: 1px solid rgba(231,76,60,0.35);
      color: #E74C3C; padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.8rem;
    }
    .auth-success {
      background: rgba(39,174,96,0.12); border: 1px solid rgba(39,174,96,0.35);
      color: #27AE60; padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.8rem;
    }
    .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Social login */
    .auth-social {
      background: #1a1a1a;
      border-radius: 8px;
      padding: 0.875rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .social-label { color: #888; font-size: 0.9rem; }

    .social-icons { display: flex; gap: 0.75rem; }

    .social-icon-btn {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: #2a2a2a;
      border: 1px solid #333;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; cursor: pointer;
      transition: all 0.2s; color: #fff;
      font-weight: 700;
    }
    .social-icon-btn:hover {
      background: #333;
      border-color: #555;
      transform: scale(1.1);
    }

    /* Terms */
    .auth-terms {
      text-align: center;
      color: #555; font-size: 0.78rem;
      line-height: 1.5;
      padding: 0 2rem 1.5rem;
    }
    .auth-terms a { color: #3498DB; text-decoration: none; font-weight: 600; }
    .auth-terms a:hover { text-decoration: underline; }

    /* Switch link */
    .auth-switch {
      text-align: center; color: #555; font-size: 0.85rem;
      margin-top: 0.25rem;
    }
    .auth-switch span { color: #3498DB; cursor: pointer; font-weight: 600; }
    .auth-switch span:hover { text-decoration: underline; }

    /* Error / Success */
    .auth-error {
      background: rgba(231, 76, 60, 0.1);
      border: 1px solid rgba(231, 76, 60, 0.3);
      color: #E74C3C; padding: 0.75rem; border-radius: 8px;
      font-size: 0.82rem;
    }
    .auth-success {
      background: rgba(39, 174, 96, 0.1);
      border: 1px solid rgba(39, 174, 96, 0.3);
      color: #27AE60; padding: 0.75rem; border-radius: 8px;
      font-size: 0.82rem;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  scrollProgress = signal(0);
  showScrollTop  = signal(false);
  showAuthModal  = signal(false);
  showProfile    = signal(false);
  authTab        = signal<'login' | 'register' | 'forgot'>('login');
  authLoading    = signal(false);
  authError      = signal('');
  authSuccess    = signal('');

  // Login animation bars
  animBars: { angle: number; active: boolean }[] = [];
  private barIndex = 0;
  private barTimer: any;

  // Login fields
  loginEmail    = '';
  loginPassword = '';

  // Register fields
  regName     = '';
  regEmail    = '';
  regPhone    = '';
  regPassword = '';
  regPlan     = 'pro';

  // Forgot password
  forgotEmail = '';

  constructor(public authService: AuthService) {}

  private boundOpenModal:   EventListener | null = null;
  private boundGoHome:      EventListener | null = null;
  private boundShowProfile: EventListener | null = null;

  ngOnInit() {
    this.initScrollReveal();

    // Remove any stale listeners before adding new ones (hot-reload safety)
    if (this.boundOpenModal)   window.removeEventListener('open-auth-modal', this.boundOpenModal);
    if (this.boundGoHome)      window.removeEventListener('go-home', this.boundGoHome);
    if (this.boundShowProfile) window.removeEventListener('show-profile', this.boundShowProfile);

    this.boundOpenModal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      this.authTab.set(detail?.tab || 'login');
      if (detail?.plan) this.regPlan = detail.plan;
      this.showAuthModal.set(true);
      this.authError.set('');
      this.authSuccess.set('');
      this.startBarAnimation();
    };

    this.boundGoHome = () => {
      this.showProfile.set(false);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    };

    this.boundShowProfile = () => {
      this.showProfile.set(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    };

    window.addEventListener('open-auth-modal', this.boundOpenModal);
    window.addEventListener('go-home', this.boundGoHome);
    window.addEventListener('show-profile', this.boundShowProfile);
  }

  ngOnDestroy() {
    if (this.boundOpenModal)   window.removeEventListener('open-auth-modal', this.boundOpenModal);
    if (this.boundGoHome)      window.removeEventListener('go-home', this.boundGoHome);
    if (this.boundShowProfile) window.removeEventListener('show-profile', this.boundShowProfile);
  }

  openModal(tab: 'login' | 'register' = 'login') {
    this.authTab.set(tab);
    this.showAuthModal.set(true);
    this.authError.set('');
    this.authSuccess.set('');
    this.startBarAnimation();
  }

  closeModal() {
    this.showAuthModal.set(false);
    this.authError.set('');
    this.authSuccess.set('');
    this.stopBarAnimation();
  }

  handleLogout() {
    this.authService.logout();
    this.showProfile.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.authError.set('Please enter email and password');
      return;
    }
    this.authLoading.set(true);
    this.authError.set('');

    this.authService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: () => {
        this.authLoading.set(false);
        this.showProfile.set(true);
        this.closeModal();
      },
      error: (err) => {
        this.authLoading.set(false);
        this.authError.set(err?.error?.message || 'Invalid email or password');
      }
    });
  }

  register() {
    if (!this.regName || !this.regEmail || !this.regPassword || !this.regPhone) {
      this.authError.set('Please fill all fields');
      return;
    }
    this.authLoading.set(true);
    this.authError.set('');
    this.authSuccess.set('');

    this.authService.register({
      name: this.regName,
      email: this.regEmail,
      password: this.regPassword,
      phone: this.regPhone,
      membershipPlan: this.regPlan,
    }).subscribe({
      next: () => {
        this.authLoading.set(false);
        this.authSuccess.set('Account created! Please login now.');
        setTimeout(() => this.authTab.set('login'), 1500);
      },
      error: (err) => {
        this.authLoading.set(false);
        this.authError.set(err?.error?.message || 'Registration failed. Try again.');
      }
    });
  }

  forgotPassword() {
    if (!this.forgotEmail) {
      this.authError.set('Please enter your email address');
      return;
    }
    this.authLoading.set(true);
    this.authError.set('');
    this.authSuccess.set('');

    this.authService.forgotPassword(this.forgotEmail).subscribe({
      next: (res: any) => {
        this.authLoading.set(false);
        this.authSuccess.set(res.message || 'If that email exists, a reset link has been sent.');
        this.forgotEmail = '';
      },
      error: () => {
        this.authLoading.set(false);
        // Same success message to avoid email enumeration
        this.authSuccess.set('If that email exists, a reset link has been sent.');
      },
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    this.showScrollTop.set(scrollTop > 400);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  initScrollReveal() {
    const run = () => {
      const viewportHeight = window.innerHeight;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight) {
          (el as HTMLElement).classList.add('visible');
        } else {
          (el as HTMLElement).classList.add('animate');
          observer.observe(el);
        }
      });
    };
    run();
    setTimeout(run, 100);
  }

  // ── Bar animation for login modal ──────────────────
  private startBarAnimation() {
    const numBars = 50;
    this.animBars = Array.from({ length: numBars }, (_, i) => ({
      angle: (360 / numBars) * i,
      active: false,
    }));
    this.barIndex = 0;
    this.stopBarAnimation();
    this.barTimer = setInterval(() => {
      const idx = this.barIndex % numBars;
      this.animBars[idx].active = true;
      if (this.barIndex > 8) {
        this.animBars[(this.barIndex - 8) % numBars].active = false;
      }
      this.barIndex++;
    }, 80);
  }

  private stopBarAnimation() {
    if (this.barTimer) { clearInterval(this.barTimer); this.barTimer = null; }
  }
}
