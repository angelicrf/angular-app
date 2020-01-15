import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post;
  @Input() isEdit: boolean;
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();

  constructor(private postService: PostService) { }

  ngOnInit() {
  }
 addPost(title, body) {
    if (!title || !body) {
      alert('There is no body or title');
    } else {
       this.postService.savePost({
         title, body
       } as Post).
       subscribe(post => {
        // console.log('Posts are: ', post);
         this.newPost.emit(post);
       });
    }

 }
  updatePost() {
   this.postService.updatePost(this.currentPost)
     .subscribe(post => {
      this.updatedPost.emit(post);
     });
  }
}
