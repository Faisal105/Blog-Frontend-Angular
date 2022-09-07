import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn = false;
  constructor(private router: Router, private authService: AuthService) {}
  title = 'Blog-frontend';

  ngOnInit() {
    this.authService.notifyLogin$.subscribe((data) => {
      this.loggedIn = !!this.authService.getToken();
      this.loggedIn = true;
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.loggedIn = false;
  }
}
