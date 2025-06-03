import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { username: 'admin', password: '123', roles: ['ADMIN'] },
    { username: 'tfotso', password: '123', roles: ['USER'] },
  ];

  private loggedUser!: string;
  private isloggedIn: Boolean = false;
  private roles!: string[];

  constructor(private router: Router) {}

  signIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((currentUser) => {
      if (
        currentUser.username == user.username &&
        currentUser.password == user.password
      ) {
        validUser = true;
        this.loggedUser = currentUser.username;
        this.roles = currentUser.roles;
        this.isloggedIn = true;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isLoggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  public getLoggedUsername(): string {
    return this.loggedUser;
  }

  public islogged(): Boolean {
    return this.isloggedIn;
  }

  public isAdmin(): Boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ADMIN') > -1;
  }

  public logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isLoggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }
}
