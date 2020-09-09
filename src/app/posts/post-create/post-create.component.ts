import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter();

  ngOnInit(): void {

  }

  clearForm(){
    this.enteredTitle = "";
    this.enteredContent = "";
  }

  onAddPost(){
    const post ={
      title: this.enteredTitle,
      content : this.enteredContent
    }
    this.postCreated.emit(post)
    this.clearForm();
  }

}
