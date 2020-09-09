import { Post } from './post.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class PostService {
  private posts : Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private httpClient: HttpClient) { }

  getPosts(){

    this.httpClient.get<{message:String, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData)=>{
        this.posts =  postData.posts
        this.postUpdated.next([...this.posts])
        console.log(postData.message);

      })
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable()
  }

  addPost(title: String, content: String){

    const post: Post = {id:null, title: title, content: content}
    this.posts.push(post)
    this.postUpdated.next([...this.posts])


  }
}
