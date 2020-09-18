import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs'

import { Post} from '../post.model'
import { PostService} from '../post.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  private postSubs: Subscription

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
    this.postSubs=this.postService.getPostUpdateListener()
      .subscribe((posts: Post[])=>{
        this.posts = posts
      })
  }

  onDelete( postId : string){
    this.postService.deletePost(postId)
  }


  ngOnDestroy(){
    this.postSubs.unsubscribe()
  }



}
