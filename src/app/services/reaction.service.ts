import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IReaction } from '../models/reacts';
import { reactionPayload } from '../models/reaction';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'commentReactions/';
  constructor() {}

  getAllReactions(): Observable<IReaction[]> {
    return this.http.get<IReaction[]>(this.baseUrl);
  }

  public postReaction(reactionPayload: reactionPayload) {
    return this.http.post(this.baseUrl, reactionPayload);
  }

  removeReactionById(reactionId: number, userId: number) {
    return this.http.delete(this.baseUrl + reactionId, { body: { userId } });
  }
}
