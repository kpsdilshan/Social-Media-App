import { Post } from './post.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts : Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private httpClient: HttpClient, private router: Router) { }

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
    return this.httpClient.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/'+id)
  }

  addPost(title: String, content: String){

    const post: Post = {id:null, title: title, content: content}
    this.httpClient.post<{message: string, postId : string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData)=>{
        const postId = responseData.postId  //when create a post adding the id value to postlist
        post.id = postId
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
        this.router.navigate(['/'])
      })


  }

  //update post
  updatePost( id: string, title: String, content: string){
    const post : Post = {
      id: id,
      title: title,
      content: content
    }

    this.httpClient.put('http://localhost:3000/api/posts/'+id, post)
      .subscribe(result=>{
        const UpdatedPosts = [...this.posts]
        const oldPostIndex = UpdatedPosts.findIndex(p=>{ p.id === post.id})
        UpdatedPosts[oldPostIndex] = post
        this.posts = UpdatedPosts
        this.postUpdated.next([...this.posts])
        this.router.navigate(['/'])
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
