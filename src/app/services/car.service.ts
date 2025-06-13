import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carsURL = environment.apiUrl + 'cars';

  constructor(public http: HttpClient) {}
  public getCars(): Observable<{ data: Car[] }> {
    return this.http.get<{ data: Car[] }>(this.carsURL);
  }
  public getCarById(id: number): Observable<{ data: Car }> {
    return this.http.get<{ data: Car }>(`${this.carsURL}/${id}`);
  }
}
