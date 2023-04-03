import { Injectable } from '@angular/core';

import { User } from './user';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: User | null;
  redirectUrl!: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: ToastrService) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.info('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.messageService.show('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this.messageService.success(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }

  isAdmin(): boolean {
    return this.currentUser?.userName==='admin';
  }
}
