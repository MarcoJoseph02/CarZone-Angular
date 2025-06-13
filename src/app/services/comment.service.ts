import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IComment,
  ICommentCreation,
  ICommentCreationResponse,
  ICommentUpdate,
} from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsURL = environment.apiUrl + 'comments/';
  http = inject(HttpClient);
  constructor() {}
  getAllComments(): Observable<{ data: IComment[] }> {
    return this.http.get<{ data: IComment[] }>(this.commentsURL);
  }
  createComment(
    comment: ICommentCreation
  ): Observable<ICommentCreationResponse> {
    return this.http.post<ICommentCreationResponse>(this.commentsURL, comment);
  }
  updateComment(commentId: number, comment: ICommentUpdate) {
    return this.http.put<ICommentCreationResponse>(
      this.commentsURL + commentId,
      comment
    );
  }
  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.delete<any>(this.commentsURL + commentId, {
      body: { user_id: userId },
    });
  }
}
