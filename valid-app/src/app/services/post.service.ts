import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Post} from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  pstUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient)  { }
  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.pstUrl);
  }
}
