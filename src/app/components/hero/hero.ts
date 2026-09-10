import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, HostListener, signal
} from '@angular/core';

interface RibbonPoint {
  x: number; y: number;
  dx: number; dy: number;
  size: number; color: string;
}

const CFG = {
  SPEED_X:      0.15,
  SPEED_Y:      0.15,
  MAX_LENGTH:   130,
  RED_STEP:     0.02,
  GREEN_STEP:   0.015,
  BLUE_STEP:    0.025,
  SPREAD_LIMIT: 20,
};

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {

  // ── Video ──────────────────────────────────────────
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  private videoSources = [
    '15079739_1920_1080_30fps.mp4',
    '200657-913478674_medium.mp4',
    '6388865-uhd_3840_2160_25fps.mp4'
  ];

  currentVideoIndex = signal(0);
  private videoInterval: any;

  // ── Ribbon canvas ──────────────────────────────────
  @ViewChild('ribbonCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private rafId = 0;
  private points: RibbonPoint[] = [];
  private mouse      = { x: 0, y: 0 };
  private prevMouse  = { x: 0, y: 0 };
  private colorState = { red: 0, green: 255, blue: 255, size: 0 };
  private autoAngle  = 0;
  private userMoved  = false;

  // ── Lifecycle ──────────────────────────────────────
  ngOnInit() {
    this.startVideoRotation();
  }

  ngAfterViewInit() {
    // Init video
    this.playVideo();

    // Init canvas
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.mouse.x     = window.innerWidth  / 2;
    this.mouse.y     = window.innerHeight / 2;
    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;
    this.draw();
  }

  ngOnDestroy() {
    if (this.videoInterval) clearInterval(this.videoInterval);
    cancelAnimationFrame(this.rafId);
  }

  // ── Video methods ──────────────────────────────────
  getCurrentVideoSrc(): string {
    return this.videoSources[this.currentVideoIndex()];
  }

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', {
      detail: { tab: 'register' }
    }));
  }

  nextVideo() {
    const next = (this.currentVideoIndex() + 1) % this.videoSources.length;
    this.currentVideoIndex.set(next);
    setTimeout(() => {
      const v = this.videoPlayer?.nativeElement;
      if (v) { v.muted = true; v.load(); v.play().catch(() => {}); }
    }, 100);
  }

  private playVideo() {
    setTimeout(() => {
      const v = this.videoPlayer?.nativeElement;
      if (!v) return;
      v.muted = true;
      v.load();
      v.play().catch(() => {
        const retry = () => { v.play().catch(() => {}); };
        document.addEventListener('click',      retry, { once: true });
        document.addEventListener('touchstart', retry, { once: true });
      });
    }, 200);
  }

  private startVideoRotation() {
    this.videoInterval = setInterval(() => this.nextVideo(), 10000);
  }

  // ── Canvas / Ribbon ────────────────────────────────
  @HostListener('window:resize')
  resize() {
    const c = this.canvasRef?.nativeElement;
    if (!c) return;
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouse.x  = e.clientX;
    this.mouse.y  = e.clientY;
    this.userMoved = true;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (!e.touches?.[0]) return;
    this.mouse.x  = e.touches[0].clientX;
    this.mouse.y  = e.touches[0].clientY;
    this.userMoved = true;
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;

    // Auto figure-8 when no mouse movement
    if (!this.userMoved) {
      this.autoAngle += 0.012;
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      this.mouse.x = cx + canvas.width  * 0.38 * Math.sin(this.autoAngle);
      this.mouse.y = cy + canvas.height * 0.28 * Math.sin(this.autoAngle * 2);
    }

    const mouseX = this.mouse.x;
    const mouseY = this.mouse.y;
    const lim = CFG.SPREAD_LIMIT;
    const dx = Math.max(-lim, Math.min(lim, (mouseX - this.prevMouse.x) * CFG.SPEED_X));
    const dy = Math.max(-lim, Math.min(lim, (mouseY - this.prevMouse.y) * CFG.SPEED_Y));

    this.prevMouse.x = mouseX;
    this.prevMouse.y = mouseY;

    const cs = this.colorState;
    cs.size  += 0.125;
    cs.red   += CFG.RED_STEP;
    cs.green += CFG.GREEN_STEP;
    cs.blue  += CFG.BLUE_STEP;

    const size = Math.abs(Math.sin(cs.size) * 12) + 2;
    const r    = Math.floor(Math.sin(cs.red)   * 128 + 128);
    const g    = Math.floor(Math.sin(cs.green) * 128 + 128);
    const b    = Math.floor(Math.sin(cs.blue)  * 128 + 128);

    this.points.push({ x: mouseX, y: mouseY, dx, dy, size, color: `rgb(${r},${g},${b})` });
    if (this.points.length > CFG.MAX_LENGTH) this.points.shift();

    // Fade — transparent so video shows through
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle   = 'rgba(0, 0, 0, 0.04)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ribbon 3× with lighter blend for neon glow over video
    this.ctx.globalCompositeOperation = 'lighter';
    this.drawLines();
    this.drawLines();
    this.drawLines();

    this.rafId = requestAnimationFrame(() => this.draw());
  }

  private drawLines() {
    const pts   = this.points;
    const total = pts.length;
    if (total < 3) return;

    for (let i = total - 1; i > 1; i--) {
      const p0 = pts[i];
      const p1 = pts[i - 1];
      const p2 = pts[i - 2];

      this.ctx.beginPath();
      this.ctx.strokeStyle = p0.color;
      this.ctx.lineWidth   = p0.size;
      this.ctx.globalAlpha = i / total;
      this.ctx.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
      this.ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      this.ctx.stroke();

      p0.x += p0.dx;
      p0.y += p0.dy;
    }

    if (pts[0]) { pts[0].x += pts[0].dx; pts[0].y += pts[0].dy; }
    const last = pts[total - 1];
    if (last)   { last.x += last.dx; last.y += last.dy; }
  }
}
