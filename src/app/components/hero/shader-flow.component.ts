import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shader-flow',
  standalone: true,
  template: '<canvas #canvas style="display: block; width: 100%; height: 100%; position: absolute; inset: 0;"></canvas>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
    }
  `]
})
export class ShaderFlowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private animationId: number = 0;
  private time: number = 0;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private isVisible: boolean = true;

  ngOnInit() {}

  ngAfterViewInit() {
    // Delay initialization to ensure parent has dimensions
    setTimeout(() => {
      this.initWebGL();
      this.setupObservers();
      this.animate();
    }, 100);
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initWebGL() {
    const canvas = this.canvasRef.nativeElement;
    
    this.gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    if (!this.gl) {
      // Fallback for browsers without WebGL2 support
      canvas.style.background = 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)';
      return;
    }

    this.resize();
    this.createShader();
  }

  private createShader() {
    if (!this.gl) return;

    const vertexShaderSource = `#version 300 es
      precision highp float;
      in vec2 position;
      out vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      
      uniform float uTime;
      uniform vec2 uResolution;
      
      // Noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(int i = 0; i < 6; i++) {
          value += amplitude * smoothNoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = vUv;
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;
        
        // Flow animation
        vec2 flowDir = vec2(0.3, 0.15);
        float t = uTime * 0.08;
        
        // Domain warping
        vec2 q = vec2(
          fbm(p + t * flowDir),
          fbm(p + vec2(1.7, 2.3) + t * flowDir)
        );
        
        vec2 r = vec2(
          fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.6),
          fbm(p + 3.0 q + vec2(8.3, 2.8) + t * 0.6)
        );
        
        float f = fbm(p + 2.5 * r);
        
        // Color gradients - dark theme
        vec3 colorLow = vec3(0.05, 0.05, 0.08);  // Very dark blue-black
        vec3 colorMid = vec3(0.08, 0.12, 0.18);  // Dark blue-gray
        vec3 colorHigh = vec3(0.12, 0.15, 0.22); // Lighter dark blue
        
        vec3 color = mix(colorLow, colorMid, smoothstep(0.0, 0.5, f));
        color = mix(color, colorHigh, smoothstep(0.5, 1.0, f));
        
        // Add some blue accent glow
        float glow = length(q) * 0.15;
        color += vec3(0.02, 0.04, 0.08) * glow;
        
        // Circular fade from center
        float distFromCenter = length(p);
        float vignette = 1.0 - smoothstep(0.3, 1.8, distFromCenter);
        color *= mix(0.3, 1.0, vignette);
        
        fragColor = vec4(color, 1.0);
      }
    `;

    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    this.program = this.gl.createProgram();
    if (!this.program) return;

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      // Shader linking failed - silently fall back to default background
      return;
    }

    // Create full-screen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.useProgram(this.program);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      // Shader compilation failed
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private animate = () => {
    if (!this.gl || !this.program || !this.isVisible) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }

    this.time += 0.016; // Approximately 60fps

    const timeLocation = this.gl.getUniformLocation(this.program, 'uTime');
    const resolutionLocation = this.gl.getUniformLocation(this.program, 'uResolution');

    this.gl.uniform1f(timeLocation, this.time);
    this.gl.uniform2f(resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationId = requestAnimationFrame(this.animate);
  }

  private resize = () => {
    if (!this.gl) return;

    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();

    // Don't resize if dimensions are invalid
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    if (this.gl) {
      this.gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  private setupObservers() {
    // Resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(this.canvasRef.nativeElement);

    // Intersection observer for performance
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
    });
    this.intersectionObserver.observe(this.canvasRef.nativeElement);

    // Visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = () => {
    this.isVisible = !document.hidden;
  }

  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    if (this.gl) {
      const ext = this.gl.getExtension('WEBGL_lose_context');
      if (ext) {
        ext.loseContext();
      }
    }
  }
}
