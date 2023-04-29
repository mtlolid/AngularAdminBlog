import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from './blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  private blogsUrl = 'http://localhost:3000/blogs'

  getAll(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(this.blogsUrl);
  }

  createBlog(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.blogsUrl, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.blogsUrl}/${id}`);
  }

  editBlog(blog: IBlog, id: number): Observable<IBlog>{
    return this.http.patch<IBlog>(`${this.blogsUrl}/${id}`, blog);
  };


}
