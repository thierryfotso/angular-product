import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslation } from './translate-loader.config';
import { includeBearerTokenInterceptor} from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.init.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    initializeKeycloak(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor]),
      withInterceptorsFromDi()
    ),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
  ],
};
