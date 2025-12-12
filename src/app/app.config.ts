import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslation } from './translate-loader.config';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      //translate.setDefaultLang('fr');
      translate.addLangs(['en', 'fr']);
      return lastValueFrom(translate.use('fr'));
    })
  ],
};
