import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEvent } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsURL = environment.apiUrl + 'events/';

  http = inject(HttpClient);

  constructor() {}

  public createEvent(event: IEvent): Observable<IEvent[]> {
    return this.http.post<IEvent[]>(this.eventsURL, event);
  }

  public getAllEvents(): Observable<{ data: IEvent[] }> {
    return this.http.get<{ data: IEvent[] }>(this.eventsURL);
  }

  public getEventByID(eventID: string) {
    return this.http.get(this.eventsURL + eventID);
  }

  public updateEvent(eventID: number, event: IEvent) {
    return this.http.put(this.eventsURL + eventID, event);
  }

  public deleteEvent(eventID: number) {
    return this.http.delete(this.eventsURL + eventID);
  }
}
