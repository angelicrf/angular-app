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
  updatePost(post: Post): Observable<Post> {
    const Url = `${this.pstUrl}/${post.id}`;
    return this.http.put<Post>(Url, post, httpOptions );
  }
  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const Url = `${this.pstUrl}/${id}`;
    return this.http.delete<Post>(Url, httpOptions);
  }
  getPostId(id: number): Observable<Post> {
    const Url = `${this.pstUrl}/${id}`;
    return this.http.get<Post>(Url);
  }
}
