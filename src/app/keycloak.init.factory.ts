import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {

  keycloak.keycloakEvents$.subscribe({
    next(event) {
      if (event.type == KeycloakEventType.OnTokenExpired) {
        //keycloak.updateToken(20);
      }
    },
  });

  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required', // 'login-required' , 'check-sso'
        /*
        onLoad: 'check-sso', // 'login-required' , 'check-sso'
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        */
          //checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/error', '/not-found', '/assets'],
    });
}
