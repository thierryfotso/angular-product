import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelperService = new JwtHelperService();
  private jwtToken!: string;
  private loggedUser!: string;
  private isloggedIn: Boolean = false;
  private roles!: string[];

  constructor(private httpClient: HttpClient, private router: Router) {}

  public login(user: User) {
    return this.httpClient.post<User>(environment.LOGIN_API_URL, user, {
      observe: 'response',
    });
  }

  public saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.jwtToken = token;
    this.isloggedIn = true;
    this.decodeJwt();
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('jwt')!;
    this.decodeJwt();
  }

  public getToken(): string {
    return this.jwtToken;
  }

  public isExpired(): boolean {
    return this.jwtHelperService.isTokenExpired(this.jwtToken);
  }

  private decodeJwt() {
    if (this.jwtToken == undefined) {
      return;
    }
    const decodedToken = this.jwtHelperService.decodeToken(this.jwtToken);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn = true;
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
    return this.roles.indexOf('ADMIN') >= 0;
  }

  public logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.jwtToken = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

}
