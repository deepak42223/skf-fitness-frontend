declare module '@studio-freight/lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(target: string | HTMLElement | number, options?: { offset?: number; duration?: number }): void;
    destroy(): void;
    on(event: string, callback: (...args: any[]) => void): void;
    stop(): void;
    start(): void;
  }
}
