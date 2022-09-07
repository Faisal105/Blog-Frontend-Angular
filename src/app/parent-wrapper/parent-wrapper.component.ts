import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-parent-wrapper',
  templateUrl: './parent-wrapper.component.html',
  styleUrls: ['./parent-wrapper.component.css'],
})
export class ParentWrapperComponent implements OnInit {
  comment: string = '';
  constructor(private helloService: ServicesService, private router: Router) {}
  blogs: any[] = [];
  ngOnInit(): void {
    this.getBlogList();
  }
  getBlogList() {
    this.helloService.getAllBlogs().subscribe(
      (data: any) => {
        console.log(data);
        this.blogs = data.blogs;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PostComment(id: any, blog: any) {
    this.helloService.comment(id, blog.tempComment).subscribe(
      (data: any) => {
        console.log(data);
        this.blogs.forEach((blog) => {
          if (blog._id === id) {
            blog.comments = data.blog.comments;
          }
        });
      },
      (err) => {}
    );
  }
  toggle(blog: any) {
    if (blog.showComments) {
      blog.showComments = false;
    } else {
      blog.showComments = true;
    }
  }
  view(id: any) {
    this.router.navigate([`/viewBlog/${id}`]);
  }
}

