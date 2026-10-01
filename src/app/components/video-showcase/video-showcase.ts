import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-showcase.html',
  styleUrls: ['./video-showcase.css']
})
export class VideoShowcaseComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('soundToggle') soundToggle!: ElementRef<HTMLButtonElement>;

  isMuted = true;

  ngAfterViewInit() {
    // Ensure video starts muted
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.muted = true;
    }
  }

  toggleSound() {
    if (this.videoPlayer?.nativeElement) {
      this.isMuted = !this.isMuted;
      this.videoPlayer.nativeElement.muted = this.isMuted;
    }
  }
}
