import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

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
    private httpClient: HttpClient,
    protected readonly keycloak: KeycloakService
  ) {}

  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }

  public keycloakLogin() {
    this.isloggedIn = this.keycloak.isLoggedIn();
    if (!this.isloggedIn) {
      this.keycloak.login();
      this.loadKeycloakToken();
    }
  }

  public loadKeycloakToken() {
    if (this.keycloak.isLoggedIn()) {
      this.keycloak.getToken().then((result) => {
        this.jwtToken = result;
        console.log('token:', result);
        this.saveKeycloakToken(result);
      });
    }
  }

  private saveKeycloakToken(token: string) {
    localStorage.setItem('jwt', token);
    this.jwtToken = token;
    this.decodeKeycloakJwt();
  }

  private decodeKeycloakJwt() {
    if (this.jwtToken == undefined) {
      return;
    }
    this.roles = this.keycloak.getUserRoles();
    const decodedToken = this.jwtHelperService.decodeToken(this.jwtToken);
    this.loggedUser = decodedToken.preferred_username;
    //use this code only when loadUserProfileAtStartUp:true, configuraton is set in keycloak init configuation
    //this.loggedUser = this.keycloak.getUsername();
    this.isloggedIn = this.keycloak.isLoggedIn();
    console.log('username:', this.keycloak.getUsername());
  }

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
