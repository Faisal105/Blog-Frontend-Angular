import {
  Component,
  Injectable,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
@Injectable({ providedIn: 'root' })
export class AddBlogComponent implements OnInit {
  myConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  @Output() onAdd = new EventEmitter<string>();

  constructor(private helloService: ServicesService, private router: Router) {}
  blogTitle = '';
  blogContent = '';
  suggestedTags = ['Business', 'Tech', 'Travel', 'Food'];

  userTags: String[] = [];

  ngOnInit(): void {}
  onSubmit() {
    this.helloService
      .addBlog({
        title: this.blogTitle,
        content: this.blogContent,
        tags: this.userTags,
      })
      .subscribe(
        (res: any) => {
          console.log(res.message);
          const data = {
            title: res.blog.title,
            content: res.blog.content,
            tags: res.blog.tags,
          };
          this.helloService.blogs.push(data);
          alert('Blog added successfully');
        },
        (err) => {
          console.log(err);
          alert(err.error.message);
        }
      );

    this.blogTitle = '';
    this.blogContent = '';
  }
  GoBack() {
    this.router.navigate(['/home']);
  }

  onTagAdd(e: any) {
    this.userTags.push(e.value);
  }

  onTagRemove(e: any) {
    this.userTags = this.userTags.filter((tag) => tag !== e);
  }
}
