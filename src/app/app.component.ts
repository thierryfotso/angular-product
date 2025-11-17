
import { AuthService } from './services/auth.service';
import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import {
HasRolesDirective,
KEYCLOAK_EVENT_SIGNAL,
KeycloakEventType,
typeEventArgs,
ReadyArgs,
}  from 'keycloak-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, TranslateModule, HasRolesDirective]
})
export class AppComponent implements OnInit {
  title = 'angular-product';
  authenticated = false;
  keycloakStatus: string | undefined;
  public profile? : KeycloakProfile;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor(
    public authService: AuthService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    const browserLang: string = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|fr|ar|de/) ? browserLang : 'en');
    effect(() => {
      const keycloakEvent = this.keycloakSignal();
      this.keycloakStatus = keycloakEvent.type;
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  ngOnInit() {
    this.authService.decodeKeycloakJwt();
  }

  onLogout() {
    this.keycloak.logout();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.keycloakLogin();
  }
}
