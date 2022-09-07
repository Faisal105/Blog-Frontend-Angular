import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  makeChanges$ = new Subject();
  blogs: any[] = [];
  constructor(private httpCLient: HttpClient) {}
  getAllBlogs() {
    return this.httpCLient.get('http://localhost:3000/blogs/all');
  }
  addBlog(data: any) {
    return this.httpCLient.post('http://localhost:3000/blog/create', data);
  }
  myBlog() {
    return this.httpCLient.get('http://localhost:3000/blogs/myblogs');
  }
  updateBlog(data: any) {
    return this.httpCLient.put('http://localhost:3000/blog/update', data);
  }
  deleteBlog(id: number) {
    return this.httpCLient.delete(
      `http://localhost:3000/blog/deleteBlog/${id}`
    );
  }
  comment(blogID: any, comment: any) {
    return this.httpCLient.put('http://localhost:3000/blog/comment/add', {
      blogID,
      comment,
    });
  }
  singleBlog(id: number) {
    return this.httpCLient.get(`http://localhost:3000/blogs/getBlog/${id}`);
  }
}
