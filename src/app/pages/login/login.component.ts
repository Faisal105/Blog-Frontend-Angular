import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  loading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    this.loginError = false;
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => {
        console.log(`Login Successfully`, data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.loginError = true;
        this.loading = false;
        console.log(`login failed: `, err.message);
      }
    );
  }
  register() {
    this.router.navigate(['/register']);
  }
}
