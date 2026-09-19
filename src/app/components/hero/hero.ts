import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, HostListener, signal
} from '@angular/core';
import * as THREE from 'three';

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
  @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;

  private videoSources = ['hero-main.mp4'];
  currentVideoIndex = signal(0);

  // ── Three.js ───────────────────────────────────────
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private rafId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private clock = new THREE.Clock();

  // ── Lifecycle ──────────────────────────────────────
  ngOnInit() {}

  ngAfterViewInit() {
    this.playVideo();
    this.initThree();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.renderer?.dispose();
  }

  // ── Video ──────────────────────────────────────────
  getCurrentVideoSrc(): string {
    return this.videoSources[this.currentVideoIndex()];
  }

  openAuthModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'register' } }));
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
        document.addEventListener('click', retry, { once: true });
        document.addEventListener('touchstart', retry, { once: true });
      });
    }, 200);
  }

  // ── Three.js Particles ────────────────────────────
  private initThree() {
    const canvas = this.threeCanvas.nativeElement;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Renderer — transparent so video shows through
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // fully transparent

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 5;

    // Particle geometry — 2000 random points in 3D space
    const COUNT = 2000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    // Color palette: blue, cyan, white, gold
    const palette = [
      new THREE.Color('#2563EB'), // electric blue
      new THREE.Color('#60A5FA'), // light blue
      new THREE.Color('#FFFFFF'), // white
      new THREE.Color('#93C5FD'), // sky blue
      new THREE.Color('#F4A623'), // gold accent
    ];

    for (let i = 0; i < COUNT; i++) {
      // Spread particles across a wide area
      positions[i * 3]     = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;  // z

      // Random color from palette
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Random sizes — most small, some bigger
      sizes[i] = Math.random() < 0.05 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    // Circular particle texture via canvas
    const texCanvas = document.createElement('canvas');
    texCanvas.width  = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(texCanvas);

    // Material — vertex colors, additive blending for glow
    const material = new THREE.PointsMaterial({
      size: 0.08,
      map: texture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate() {
    this.rafId = requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Slowly rotate the whole particle system
    this.particles.rotation.y = elapsed * 0.04;
    this.particles.rotation.x = elapsed * 0.015;

    // Subtle drift toward mouse
    this.particles.rotation.y += this.mouseX * 0.00008;
    this.particles.rotation.x += this.mouseY * 0.00008;

    // Gentle float — move individual particles using sin wave
    const positions = (this.particles.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(elapsed * 0.3 + i) * 0.0003; // gentle vertical drift
    }
    this.particles.geometry.getAttribute('position').needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  // ── Events ────────────────────────────────────────
  @HostListener('window:resize')
  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX - window.innerWidth  / 2;
    this.mouseY = e.clientY - window.innerHeight / 2;
  }
}
