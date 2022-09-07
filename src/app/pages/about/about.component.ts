import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() name = '';
  blogs: any[] = [];
  curentUpdatingBlog: any;
  constructor(private helloService: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.myBlog();
    console.log(this.blogs);
  }
  myBlog() {
    this.helloService.myBlog().subscribe(
      (data: any) => {
        console.log(data);
        this.blogs = data.blogs;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBlog(id: any) {
    this.helloService.deleteBlog(id).subscribe(
      (res: any) => {
        console.log('data', res);
        alert('blog deleted Successfully');
        this.myBlog();
      },
      (err) => {
        console.log('err', err);
        alert(err.error.message);
      }
    );
  }
  updateBlog(
    id: any,
    updatedTitle: HTMLInputElement,
    updatedContent: HTMLTextAreaElement
  ) {
    const data: any = {
      title: updatedTitle.value,
      content: updatedContent.value,
      id: id,
    };
    console.log(updatedTitle.value, updatedContent.value);
    this.helloService.updateBlog(data).subscribe(
      (data: any) => {
        this.myBlog();
        this.router.navigate(['/about']);
      },
      (err) => {}
    );
  }
  openModal(blog: any) {
    this.curentUpdatingBlog = blog;
  }
  view(id: any) {
    this.router.navigate([`/viewBlog/${id}`]);
  }
}
