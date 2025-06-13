import { Component, Input } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  imports: [],
  animations: [
    trigger('fadeInOut', [
      state('slideIn', style({ opacity: 0 })),
      state('slideOut', style({ opacity: 1 })),
      transition('slideIn <=> slideOut', [animate('100ms ease-in')]),
    ]),
  ],
})
export class ImageGalleryComponent {
  @Input({ required: true }) images!: string[];
  currentIndex = 0;
  slideState = 'slideOut';

  nextImage() {
    this.slideState = 'slideIn';
    setTimeout(() => {
      this.slideState = 'slideOut';
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 100);
  }

  prevImage() {
    this.slideState = 'slideIn';
    setTimeout(() => {
      this.slideState = 'slideOut';
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    }, 100);
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }
}
