import { Post } from './post.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class PostService {
  private posts : Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private httpClient: HttpClient) { }

  getPosts(){

    this.httpClient.get<{message:String, posts : any}>('http://localhost:3000/api/posts')
      .pipe(map((postData)=>{
        return postData.posts.map(post=>{
          return {
            title : post.title,
            content : post.content,
            id : post._id
          }
        })
      }))
      .subscribe((transformedPosts)=>{
        this.posts =  transformedPosts
        this.postUpdated.next([...this.posts])
      })
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable()
  }

  getPost( id : string){
    return {...this.posts.find(p =>{ p.id ===id})}
  }

  addPost(title: String, content: String){

    const post: Post = {id:null, title: title, content: content}
    this.httpClient.post<{message: string, postId : string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData)=>{
        const postId = responseData.postId  //when create a post adding the id value to postlist
        post.id = postId
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
      })


  }

  //delete post
  deletePost(postId : string){
     this.httpClient.delete('http://localhost:3000/api/posts/'+postId)
      .subscribe(()=>{
        const updatedPosts = this.posts.filter(post=> post.id !==postId)
        this.posts = updatedPosts
        this.postUpdated.next([...this.posts])
      })
  }
}
