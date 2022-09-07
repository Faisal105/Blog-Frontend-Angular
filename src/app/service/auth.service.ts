import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public notifyLogin$ = new Subject();
  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string) {
    return this.httpClient.post('http://localhost:3000/user/login', {
      email,
      password,
    });
  }
  register(name: string, email: string, password: string) {
    return this.httpClient.post('http://localhost:3000/user/register', {
      name,
      email,
      password,
    });
  }
  getToken() {
   let token = localStorage.getItem('token');
   if (token) this.notifyLogin$.next(true);
   return token;
  }
}
