import { Component, HostListener, signal, OnInit, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  isScrolled    = signal(false);
  menuOpen      = signal(false);
  activeSection = signal('home');
  isDark        = signal(true);

  isLoggedIn = computed(() => this.authService.isLoggedIn());
  userName   = computed(() => {
    const u = this.authService.currentUser();
    return u ? u.name.split(' ')[0] : '';
  });

  private sections = ['home','programs','about','services','workout-format','pricing','trainers','contact'];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const saved = localStorage.getItem('skf-theme');
    if (saved === 'light') {
      this.isDark.set(false);
      document.body.classList.add('light-mode');
    } else {
      this.isDark.set(true);
      document.body.classList.remove('light-mode');
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
    let current = 'home';
    for (const id of this.sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    this.activeSection.set(current);
  }

  // Smart navigate — goes home first if on profile page, then scrolls to section
  navigate(section: string) {
    // Always fire go-home first to return to main website
    window.dispatchEvent(new CustomEvent('go-home'));

    // Then scroll to the section after a short delay
    setTimeout(() => {
      if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 150);
  }

  goHome() {
    window.dispatchEvent(new CustomEvent('go-home'));
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150);
  }

  goToProfile() {
    window.dispatchEvent(new CustomEvent('show-profile'));
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150);
  }

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'login' } }));
  }

  toggleTheme() {
    const newMode = !this.isDark();
    this.isDark.set(newMode);
    if (newMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('skf-theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('skf-theme', 'light');
    }
  }

  isActive(id: string): boolean { return this.activeSection() === id; }
  toggleMenu() { this.menuOpen.set(!this.menuOpen()); }
  closeMenu()  { this.menuOpen.set(false); }
}
