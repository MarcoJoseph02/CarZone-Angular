import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleMapData } from '../models/branch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  http = inject(HttpClient);
  private branchURL = environment.apiUrl + 'branches';

  constructor() {}

  getBranches(): Observable<{ data: GoogleMapData[] }> {
    return this.http.get<{ data: GoogleMapData[] }>(this.branchURL);
  }
}
