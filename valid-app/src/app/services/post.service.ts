import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Post} from '../models/Post';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  pstUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient)  { }
  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.pstUrl);
  }
  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.pstUrl, post, httpOptions);
  }
}
