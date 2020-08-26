import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newPost = 'NO Content'

  onAddPost(postInput: HTMLTextAreaElement){
    console.log(postInput);

    this.newPost = 'The user\'s post';
  }
}
