import { Component } from '@angular/core';
import { IBlog } from 'src/app/shared/blog.interface';
import { BlogService } from 'src/app/shared/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public blogsArray: Array<IBlog> = [];

  constructor(
    private blogService: BlogService
  ) { };

  getBlogs(): void {
    this.blogService.getAll().subscribe(
      data => { this.blogsArray = data }
    )
  }

  ngOnInit(): void {
    this.getBlogs();
  }
  
}
