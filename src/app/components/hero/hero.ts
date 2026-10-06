import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';

const CONFIG = {
  SPEED_X: 0.15,
  SPEED_Y: 0.15,
  MAX_LENGTH: 120,
  RED_STEP: 0.02,
  GREEN_STEP: 0.015,
  BLUE_STEP: 0.025,
  SPREAD_LIMIT: 20,
};

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ribbonCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationId = 0;
  private points: any[] = [];
  private mouse = { x: 0, y: 0 };
  private prev  = { x: 0, y: 0 };
  private color = { red: 0, green: 255, blue: 255, size: 0 };

  constructor(private ngZone: NgZone) {}

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
  }

  ngAfterViewInit() {
    // rAF ensures canvas has real dimensions after first paint
    requestAnimationFrame(() => this.initCanvas());
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    this.mouse.x = this.prev.x = canvas.width  / 2;
    this.mouse.y = this.prev.y = canvas.height / 2;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: false });

    this.ngZone.runOutsideAngular(() => {
      const draw = () => {
        let dx = (this.mouse.x - this.prev.x) * CONFIG.SPEED_X;
        let dy = (this.mouse.y - this.prev.y) * CONFIG.SPEED_Y;
        const lim = CONFIG.SPREAD_LIMIT;
        dx = Math.max(-lim, Math.min(lim, dx));
        dy = Math.max(-lim, Math.min(lim, dy));
        this.prev.x = this.mouse.x;
        this.prev.y = this.mouse.y;

        this.color.size  += 0.125;
        this.color.red   += CONFIG.RED_STEP;
        this.color.green += CONFIG.GREEN_STEP;
        this.color.blue  += CONFIG.BLUE_STEP;

        const size = Math.abs(Math.sin(this.color.size) * 10) + 1;
        const r = Math.floor(Math.sin(this.color.red)   * 128 + 128);
        const g = Math.floor(Math.sin(this.color.green) * 128 + 128);
        const b = Math.floor(Math.sin(this.color.blue)  * 128 + 128);

        this.points.push({ x: this.mouse.x, y: this.mouse.y, dx, dy, size, color: `rgb(${r},${g},${b})` });
        if (this.points.length > CONFIG.MAX_LENGTH) this.points.shift();

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        for (let pass = 0; pass < 3; pass++) {
          const total = this.points.length;
          if (total < 3) continue;
          for (let i = total - 1; i > 1; i--) {
            const p0 = this.points[i];
            const p1 = this.points[i - 1];
            const p2 = this.points[i - 2];
            ctx.beginPath();
            ctx.strokeStyle = p0.color;
            ctx.lineWidth   = p0.size;
            ctx.globalAlpha = i / total;
            ctx.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
            ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
            ctx.stroke();
            p0.x += p0.dx;
            p0.y += p0.dy;
          }
        }

        this.animationId = requestAnimationFrame(draw);
      };
      draw();
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
