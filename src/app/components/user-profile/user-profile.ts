import { Component, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileApiService, ProfileData, ProfileStats, ProgressEntry } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent implements OnInit {
  @Output() onLogout = new EventEmitter<void>();

  user       = signal<any>(null);
  profile    = signal<any>(null);
  stats      = signal<ProfileStats | null>(null);
  progress   = signal<ProgressEntry[]>([]);
  attendance = signal<any[]>([]);
  loading    = signal(true);
  activeTab  = signal<'overview' | 'progress' | 'attendance' | 'membership'>('overview');

  // Edit profile
  editingProfile  = signal(false);
  savingProfile   = signal(false);
  profileSaveMsg  = signal('');
  editData: ProfileData = {};

  // Check-in / check-out
  checkinLoading = signal(false);
  checkinMsg     = signal('');

  // Add progress
  addingProgress = signal(false);
  progressMsg    = signal('');
  newProgress: ProgressEntry = { date: new Date().toISOString().slice(0, 10) };

  constructor(
    private authService: AuthService,
    private profileApi: ProfileApiService,
  ) {}

  ngOnInit() {
    const u = this.authService.getUser();
    if (u) {
      this.user.set(u);
      this.loadProfileData(u.id);
    }
  }

  loadProfileData(userId: number) {
    this.loading.set(true);

    this.profileApi.getProfile(userId).subscribe({
      next: p => this.profile.set(p),
      error: () => {}
    });

    this.profileApi.getStats(userId).subscribe({
      next: s => this.stats.set(s),
      error: () => {}
    });

    this.profileApi.getProgress(userId).subscribe({
      next: pr => this.progress.set(pr),
      error: () => {}
    });

    this.profileApi.getAttendance(userId).subscribe({
      next: a => {
        this.attendance.set(a);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setTab(tab: 'overview' | 'progress' | 'attendance' | 'membership') {
    this.activeTab.set(tab);
  }

  logout() {
    this.authService.logout();
    this.onLogout.emit();
  }

  // ── Edit Profile ──────────────────────────
  startEditProfile() {
    const p = this.profile();
    this.editData = {
      height_cm:      p?.height_cm,
      weight_kg:      p?.weight_kg,
      age:            p?.age,
      gender:         p?.gender ?? '',
      fitness_goal:   p?.fitness_goal ?? '',
      experience:     p?.experience ?? '',
      health_notes:   p?.health_notes ?? '',
    };
    this.editingProfile.set(true);
    this.profileSaveMsg.set('');
  }

  cancelEditProfile() {
    this.editingProfile.set(false);
    this.profileSaveMsg.set('');
  }

  saveProfile() {
    const userId = this.user()?.id;
    if (!userId) return;
    this.savingProfile.set(true);
    this.profileApi.updateProfile(userId, this.editData).subscribe({
      next: updated => {
        this.profile.set(updated);
        this.savingProfile.set(false);
        this.profileSaveMsg.set('✓ Profile updated successfully!');
        setTimeout(() => {
          this.editingProfile.set(false);
          this.profileSaveMsg.set('');
        }, 1500);
      },
      error: () => {
        this.savingProfile.set(false);
        this.profileSaveMsg.set('⚠ Failed to save. Try again.');
      }
    });
  }

  // ── Check-in / Check-out ──────────────────
  doCheckIn() {
    const userId = this.user()?.id;
    if (!userId) return;
    this.checkinLoading.set(true);
    this.profileApi.checkIn(userId).subscribe({
      next: () => {
        this.checkinLoading.set(false);
        this.checkinMsg.set('✓ Checked in successfully!');
        this.loadProfileData(userId);
        setTimeout(() => this.checkinMsg.set(''), 3000);
      },
      error: () => {
        this.checkinLoading.set(false);
        this.checkinMsg.set('⚠ Check-in failed. Try again.');
        setTimeout(() => this.checkinMsg.set(''), 3000);
      }
    });
  }

  doCheckOut() {
    const userId = this.user()?.id;
    if (!userId) return;
    this.checkinLoading.set(true);
    this.profileApi.checkOut(userId).subscribe({
      next: (res: any) => {
        this.checkinLoading.set(false);
        this.checkinMsg.set(`✓ Checked out! Duration: ${res?.duration ?? '—'}`);
        this.loadProfileData(userId);
        setTimeout(() => this.checkinMsg.set(''), 4000);
      },
      error: (err: any) => {
        this.checkinLoading.set(false);
        this.checkinMsg.set(err?.error?.message ?? '⚠ No active check-in found.');
        setTimeout(() => this.checkinMsg.set(''), 3000);
      }
    });
  }

  // ── Add Progress Entry ────────────────────
  addProgressEntry() {
    const userId = this.user()?.id;
    if (!userId || !this.newProgress.date) return;
    this.addingProgress.set(true);
    this.profileApi.addProgress(userId, this.newProgress).subscribe({
      next: () => {
        this.addingProgress.set(false);
        this.progressMsg.set('✓ Progress logged!');
        this.newProgress = { date: new Date().toISOString().slice(0, 10) };
        this.profileApi.getProgress(userId).subscribe({ next: pr => this.progress.set(pr), error: () => {} });
        this.profileApi.getStats(userId).subscribe({ next: s => this.stats.set(s), error: () => {} });
        setTimeout(() => this.progressMsg.set(''), 3000);
      },
      error: () => {
        this.addingProgress.set(false);
        this.progressMsg.set('⚠ Failed to save entry.');
        setTimeout(() => this.progressMsg.set(''), 3000);
      }
    });
  }

  getMembershipDaysLeft(): number {
    const user = this.user();
    if (!user?.joinedAt) return 0;
    const joined = new Date(user.joinedAt);
    const expiry = new Date(joined);
    expiry.setMonth(expiry.getMonth() + 1);
    const diff = expiry.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  getPlanBadgeColor(): string {
    const plan = this.user()?.membershipPlan;
    if (plan === 'elite') return '#FFD700';
    if (plan === 'pro')   return '#3498DB';
    return '#85C1E9';
  }
}
