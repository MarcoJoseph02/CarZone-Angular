import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reactions',
  imports: [],
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.css',
})
export class ReactionsComponent {
  @Input({ required: true }) reactionType!: string;
  @Input() size = 'normal';
  @Input() reactionCounter = 0;

  get isLike(): boolean {
    return this.reactionType === 'like';
  }
  get isLove(): boolean {
    return this.reactionType === 'love';
  }
  get isHaha(): boolean {
    return this.reactionType === 'haha';
  }
  get isSad(): boolean {
    return this.reactionType === 'sad';
  }
  get isAngry(): boolean {
    return this.reactionType === 'angry';
  }
}
