import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { contactEmailPayload } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseURL = environment.apiUrl + 'contact/';
  private http = inject(HttpClient);
  constructor() {}
  sendEmail(payload: contactEmailPayload) {
    return this.http.post(this.baseURL, payload);
  }
}
