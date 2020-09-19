import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../post.service';

import { Post} from '../post.model'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post : Post
  isLoading = false
  private mode = 'create'
  private postId : string

  constructor(public postService: PostService, public route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      console.log(paramMap.has('postId'));
      console.log(paramMap);

      if (paramMap.has('postId')) {
        this.mode ='edit'
        this.postId = paramMap.get('postId')
        console.log(this.postId);
        this.isLoading = true
        this.postService.getPost(this.postId).subscribe(postData=>{
          this.isLoading = false
          this.post =  {id: postData._id, title: postData.title, content: postData.content}
        })


      } else {
        this.mode = 'create'
        this.postId = null
      }
    })
  }

  onAddPost(form: NgForm){

    if(form.invalid){
      return
    }
    this.isLoading = true
    if(this.mode=='create'){
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content )
    }
    form.resetForm()
  }

}
