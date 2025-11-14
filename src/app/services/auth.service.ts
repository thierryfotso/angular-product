import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import Keycloak from 'keycloak-js';

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
  private isloggedIn: boolean = false;
  private roles!: string[];
  public regitredUser: User = new User();

  constructor(
    private httpClient: HttpClient, private readonly keycloak: Keycloak
  ) { }

  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }

  public keycloakLogin() {
    if (!this.keycloak.authenticated) {
      this.keycloak.login().then((result) => {
        console.log('after login--------------:',result);
        this.decodeKeycloakJwt();
      });
    }
  }

  public decodeKeycloakJwt() {
    if (!this.keycloak.authenticated) {
      return;
    }
    this.isloggedIn = this.keycloak.authenticated;
    this.jwtToken = this.keycloak.token!;
    localStorage.setItem('jwt', this.jwtToken);
    const decodedToken = this.jwtHelperService.decodeToken(this.jwtToken);
    this.roles = decodedToken.realm_access?.roles;
    this.loggedUser = decodedToken.preferred_username;
    this.keycloak.loadUserProfile().then((userProfile) => {
      this.loggedUser = userProfile.username!;
    });
  }

  public login(user: User) {
    return this.httpClient.post<User>(environment.LOGIN_API_URL, user, {
      observe: 'response',
    });
  }

  public saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.jwtToken = token;
    this.isloggedIn = this.keycloak?.authenticated;
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
    return this.keycloak.hasRealmRole('ADMIN');
  }

  public logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.jwtToken = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('jwt');
    this.keycloak.logout();
  }

  register(user: User) {
    return this.httpClient.post<User>(environment.REGISTER_API_URL, user, {
      observe: 'response',
    });
  }

  validateEmail(code: string) {
    return this.httpClient.get<User>(
      environment.USER_API_URL + 'verifyEmail/' + code
    );
  }
}
