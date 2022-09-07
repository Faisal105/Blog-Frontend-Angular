import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  blogID: any;
  blog: any;
  comment: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: ServicesService,
    private helloService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogID = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.blogID);
    this.blogService.singleBlog(this.blogID).subscribe(
      (data: any) => {
        this.blog = data.blog;
        console.log(this.blog);
      },
      (err) => {}
    );
  }

  PostComment() {
    this.helloService.comment(this.blogID, this.comment).subscribe(
      (data: any) => {
        this.blog.comments = data.blog.comments;
        console.log(this.blog.comments);
        this.comment = '';
      },

      (err) => {
        console.log(err.message);
      }
    );
  }

  AllBlog() {
    this.router.navigate(['/home']);
  }
  myBlog() {
    this.router.navigate(['/about']);
  }
  toggle(blog: any) {
    if (blog.showComments) {
      blog.showComments = false;
    } else {
      blog.showComments = true;
    }
  }
}
