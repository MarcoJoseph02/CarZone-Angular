import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { pillColors } from '../../models/pill-colors';

@Component({
  selector: 'app-pill',
  imports: [CommonModule],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.css',
})
export class PillComponent {
  @Input({ required: true }) text!: string;
  @Input() disabled: boolean = false;
  @Input() closeable: boolean = false;
  @Input() colorIndex: number = 1;
  @Input() pillStyle: string = 'big';

  get _text() {
    return this.text.charAt(0).toLocaleUpperCase() + this.text.slice(1);
  }

  containerClass(): string {
    let classes = 'animated-button ';
    if (this.disabled) {
      classes += 'animated-button-big';
      classes += ' ';
      classes += 'animated-button-disabled';
      return classes;
    }
    switch (this.pillStyle) {
      case 'big':
        classes += 'animated-button-big';
        break;
      case 'small':
        classes += 'animated-button-small';
        break;
      default:
        classes += 'animated-button-big';
        break;
    }
    classes += ' ';
    switch (this.colorIndex) {
      case 0:
        classes += 'animated-button-blue';
        break;
      case 1:
        classes += 'animated-button-green';
        break;
      case 2:
        classes += 'animated-button-yellow';
        break;
      case 3:
        classes += 'animated-button-red';
        break;
      case 4:
        classes += 'animated-button-cyan';
        break;
      case 5:
        classes += 'animated-button-magenta';
        break;
      default:
        classes += 'animated-button-green';
        break;
    }
    return classes;
  }
}
