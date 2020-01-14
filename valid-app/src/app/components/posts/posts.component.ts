import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  };
   isEdit = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost().subscribe(post => {
     // console.log('the posts are: ', post);
      this.posts = post;
    });
  }
  onNewPost(post: Post) {
    this.posts.unshift(post);
  }
  editPost(post: Post) {
    this.currentPost = post;
    this.isEdit = true;
  }
 onUpdatedPost(post: Post) {
   this.posts.forEach((cur, index) => {
     if (post.id === cur.id) {
       this.posts.splice(index , 1);
       this.posts.unshift(post);
       this.isEdit = false;
     }
   });
 }
 removePost(post: Post) {
    if (confirm('Are you Sure?')) {
      this.postService.removePost (post.id).
        subscribe(() => {
          this.posts.forEach((cur, index) => {
            if (post.id === cur.id) {
              this.posts.splice(index , 1);
            }
          });
      });
    }
 }
}
