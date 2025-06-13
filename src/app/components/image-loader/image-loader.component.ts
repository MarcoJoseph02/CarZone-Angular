import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css'],
  imports: [CommonModule],
})
export class ImageLoaderComponent implements OnInit {
  @Input({ required: true }) imageSource: any;
  @Input({ required: true }) carModel!: string;
  @Input() unavailable: number = 0;

  isLoaded = false;

  constructor() {}
  ngOnInit() {}

  onImageLoad() {
    this.isLoaded = true;
  }
}
