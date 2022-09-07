import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  registerError = false;
  registerSuccess = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(
      (data) => {
        this.registerSuccess = true;
        console.log(`Registered successfully`, data);
        alert('User Registered successfully');
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err.error.message) {
          alert(err.error.message);
        } else {
          alert(err.error);
        }
      }
    );
  }
  login() {
    this.router.navigate(['/login']);
  }
}
