import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, TranslateModule, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'angular-product';
  authenticated = false;

  constructor(
    public authService: AuthService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    const browserLang: string = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|fr|ar|hi|de/) ? browserLang : 'en');
  }

  ngOnInit() {
    //this.authService.keycloakLogin();
    this.authService.loadKeycloakToken();
  }

  onLogout() {
    this.authService.logout();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.keycloakLogin();
  }
}
