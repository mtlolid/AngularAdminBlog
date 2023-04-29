import { Component } from '@angular/core';
import { IBlog } from 'src/app/shared/blog.interface';
import { BlogService } from 'src/app/shared/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent {

  public blogsArray: Array<IBlog> = [];

  public titleInput = '';
  public textInput = '';
  public authorInput = '';

  public editId!:number;
  public editCheck = false;

  constructor(
    private blogService: BlogService
  ) { };

  clearForm(): void{
    this.titleInput = '';
    this.textInput = '';
    this.authorInput = '';
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe(
      data => { this.blogsArray = data }
    )
  }

  addBlogs(): void {
    if(this.titleInput != '' && this.textInput != '' && this.authorInput != ''){
      const newId = this.blogsArray.length + 1;     

      const newBlog = {
        id: newId,
        title: this.titleInput,
        text: this.textInput,
        author: this.authorInput
      };

      this.blogService.createBlog(newBlog).subscribe(data => {
        this.getBlogs();
        this.clearForm();
      });
    }
  }

  removeBlog(id: number): void{
    this.blogService.deleteBlog(id).subscribe(() => this.getBlogs())
  }
  
  editBlog(id: number): void{
    this.editId = id;
    this.editCheck = true;

    this.titleInput = this.blogsArray[id - 1].title
    this.textInput = this.blogsArray[id - 1].text
    this.authorInput = this.blogsArray[id - 1].author
  };

  saveBlog(): void{
    if(this.titleInput != '' && this.textInput != '' && this.authorInput != ''){

      const newBlog = {
        id: this.editId,
        title: this.titleInput,
        text: this.textInput,
        author: this.authorInput
      };

      this.blogService.editBlog(newBlog, this.editId).subscribe(() => {
        this.getBlogs();
        this.clearForm();
        this.editCheck = false;
      });
    }
  }

  ngOnInit(): void {
    this.getBlogs();
  }

}
