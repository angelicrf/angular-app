import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PostService} from '../../services/post.service';
import { Post} from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post[];

  constructor(private rout: ActivatedRoute, private postService: PostService, private location: Location) {
  }

  ngOnInit() {
    const id = +this.rout.snapshot.paramMap.get('id');
    console.log('the id is: ', id);
    this.postService.getPostId(id).subscribe(post => {
      this.post = post;
    });
  }
}
