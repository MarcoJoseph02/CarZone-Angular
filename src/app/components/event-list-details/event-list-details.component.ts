import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IEvent } from '../../models/event';
import { PillComponent } from '../pill/pill.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { EventService } from '../../services/event.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-event-list-details',
  imports: [
    PillComponent,
    CommonModule,
    ReactiveFormsModule,
    TagInputComponent,
  ],
  templateUrl: './event-list-details.component.html',
  styleUrl: './event-list-details.component.css',
})
export class EventListDetailsComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  eventsService = inject(EventService);

  _event!: IEvent;
  @Input() set event(event: IEvent) {
    if (event) {
      this.initializeEventForm(event);
      this._event = event;
      let something: string[] = [];
      this.event.content.split(',').forEach((content) => {
        something.push(content.trim());
      });
      this.eventContent = something;
    }
  }
  get event(): IEvent {
    return this._event;
  }

  eventContent: string[] = [];

  @Input() eventTime?: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() editMode: boolean = false;
  @Input() addMode: boolean = false;
  editButtonTitle = 'Edit';
  closed = false;

  eventForm = this.fb.group({
    eventName: ['', [Validators.required]],
    eventContent: ['', [Validators.required]],
    eventDescription: ['', [Validators.required]],
    eventLocation: ['', [Validators.required]],
    eventDate: ['', [Validators.required]],
    eventTime: ['', [Validators.required]],
    eventStatus: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.addMode) {
      this.editButtonTitle = 'Save';
    }
  }

  closeWindow(): void {
    this.closed = true;
    this.close.emit(false);
  }

  toggleEditMode(): void {
    this.eventForm.value.eventContent = this.eventContent.join(',');
    if (!this.eventForm.valid && !this.eventForm.value.eventContent) {
      console.log('Invalid Form');
      return;
    }
    if (this.addMode) {
      this.eventsService
        .createEvent(this.payloadForUpdateEvent)
        .pipe(
          tap(() => {
            this.closeWindow();
          })
        )
        .subscribe();
    } else if (this.editMode) {
      this.editMode = false;
      this.editButtonTitle = 'Edit';
      this.eventForm.value.eventContent = this.eventContent.join(',');

      if (this.event.id) {
        this.eventsService
          .updateEvent(this.event.id, this.payloadForUpdateEvent)
          .pipe(
            tap(() => {
              this.event = { ...this.payloadForUpdateEvent, id: this.event.id };
            })
          )
          .subscribe();
      }
    } else {
      this.editMode = true;
      this.editButtonTitle = 'Save';
    }
  }

  get payloadForUpdateEvent(): IEvent {
    return {
      content: this.eventForm.value.eventContent || '',
      event_date: this.eventForm.value.eventDate || '',
      event_description: this.eventForm.value.eventDescription || '',
      event_location: this.eventForm.value.eventLocation || '',
      event_name: this.eventForm.value.eventName || '',
      event_status: this.eventForm.value.eventStatus || '',
      event_time: this.eventForm.value.eventTime || '',
    };
  }

  disableEditMode(): void {
    this.editMode = false;
  }
  initializeEventForm(event: IEvent): void {
    this.eventForm.patchValue({
      eventName: event.event_name,
      eventContent: event.content,
      eventDescription: event.event_description,
      eventLocation: event.event_location,
      eventDate: event.event_date,
      eventTime: event.event_time,
      eventStatus: event.event_status,
    });
  }

  get eventStatus() {
    return this.eventForm.controls.eventStatus as FormControl;
  }

  isActive(label: string): boolean {
    return this.eventStatus.value === label;
  }

  setEventStatus(value: string) {
    this.eventForm.patchValue({
      eventStatus: value.toLocaleLowerCase(),
    });
  }

  deleteEvent() {
    if (this.event.id) {
      this.eventsService
        .deleteEvent(this.event.id)
        .pipe(
          tap(() => {
            this.closeWindow();
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    if (!this.closed) {
      this.close.emit(false);
    }
  }
}
