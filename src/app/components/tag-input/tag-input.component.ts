import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  imports: [FormsModule],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.css',
})
export class TagInputComponent {
  @Input({ required: true }) tags!: string[];
  @Output() tagsChange = new EventEmitter<string[]>();
  contentInput = '';

  checkIfEnterPressed(key: KeyboardEvent) {
    if (key.key === 'Enter' && this.contentInput !== '') {
      const newTags = [...this.tags, this.contentInput];
      this.tagsChange.emit(newTags);
      this.contentInput = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}
