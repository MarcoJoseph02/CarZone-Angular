import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../models/event';
import { tap } from 'rxjs';
import { EventListComponent } from '../event-list/event-list.component';
import { EventListDetailsComponent } from '../event-list-details/event-list-details.component';

@Component({
  selector: 'app-events',
  imports: [EventListComponent, EventListDetailsComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  eventsService = inject(EventService);
  events: IEvent[] = [];
  addMode = false;

  constructor() {}
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService
      .getAllEvents()
      .pipe(
        tap((res) => {
          this.events = [];
          res.data.sort((event, event2) => {
            const dateTimestamp = Date.parse(event.event_date);
            const dateTimestamp2 = Date.parse(event2.event_date);
            return dateTimestamp - dateTimestamp2;
          });
          const todayTimeStamp = Date.now();
          res.data.forEach((event) => {
            event.event_time = event.event_time.slice(0, 5);
            if (Date.parse(event.event_date) >= todayTimeStamp) {
              this.events.push(event);
            }
          });
        })
      )
      .subscribe();
  }

  reloadEvents(flag: boolean) {
    if (flag) {
      this.loadEvents();
    }
  }

  addNewEvent() {
    this.addMode = true;
    document.body.classList.add('overflow-none');
  }

  onCloseWindow() {
    this.addMode = false;
    document.body.classList.remove('overflow-none');
    this.reloadEvents(true);
  }
}
