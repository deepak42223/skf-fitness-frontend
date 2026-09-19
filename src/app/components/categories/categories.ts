import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import * as THREE from 'three';

interface Program {
  id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('progCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  programs: Program[] = [
    { id: 'strength', name: 'Strength Training', image: 'victor-freitas-WvDYdXDzkhs-unsplash.jpg' },
    { id: 'cardio',   name: 'Cardio Fitness',    image: 'cardio-fitness.jpg' },
    { id: 'yoga-fit', name: 'Yogi & Fitness',    image: 'yogi-fitness.jpg' },
    { id: 'yoga',     name: 'Yoga & Mobility',   image: 'yoga-mobility.jpg' },
    { id: 'boxing',   name: 'Boxing Fitness',    image: 'boxing-fitness.jpg' },
    { id: 'personal', name: 'Personal Training', image: 'personal-training.jpg' },
    { id: 'dance',    name: 'Dance Fitness',     image: 'dance-fitness.jpg' },
  ];

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private rafId = 0;
  private clock = new THREE.Clock();
  private observer!: IntersectionObserver;
  private running = false;

  ngAfterViewInit() {
    this.initThree();

    // Only animate when section is visible
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        this.running = e.isIntersecting;
        if (this.running) this.animate();
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.canvasRef.nativeElement.parentElement!);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.observer?.disconnect();
    this.renderer?.dispose();
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;
    const section = canvas.parentElement!;
    const w = section.offsetWidth  || window.innerWidth;
    const h = section.offsetHeight || 600;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 5;

    const COUNT = 1500;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color('#2563EB'),
      new THREE.Color('#60A5FA'),
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#93C5FD'),
      new THREE.Color('#F4A623'),
      new THREE.Color('#FCD34D'),
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    // Soft circular texture
    const tc = document.createElement('canvas');
    tc.width = tc.height = 64;
    const ctx = tc.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0,   'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.5)');
    g.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);

    const material = new THREE.PointsMaterial({
      size: 0.07,
      map: new THREE.CanvasTexture(tc),
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate() {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(() => this.animate());

    const t = this.clock.getElapsedTime();
    this.particles.rotation.y = t * 0.03;
    this.particles.rotation.x = t * 0.012;

    const pos = (this.particles.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += Math.sin(t * 0.25 + i) * 0.0002;
    }
    this.particles.geometry.getAttribute('position').needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}
