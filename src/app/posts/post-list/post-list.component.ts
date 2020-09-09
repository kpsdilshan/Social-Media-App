import { Component, OnInit, Input } from '@angular/core';

import { Post} from '../post.model'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor() { }

  // posts = [
  //   {title: "First Post", content: "This is the first post"},
  //   {title: "Second Post", content: "This is the second post"},
  //   {title: "Third Post", content: "This is the third post"}
  // ]

  @Input() posts: Post[] = []

  ngOnInit(): void {
  }

}
