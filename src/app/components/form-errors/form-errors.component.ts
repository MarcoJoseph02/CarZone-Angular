import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  @Input() errors: { [key: string]: string } = {};
  @Output() isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  get errorKeys() {
    return Object.keys(this.errors);
  }

  close(){
    this.isVisible.emit(false);
  }
}
