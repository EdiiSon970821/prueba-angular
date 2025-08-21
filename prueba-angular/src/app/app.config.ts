import { AuthService } from './modules/auth/services/auth.service';
import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise<void>((resolve) => {
      const isAuth = localStorage.getItem('auth') === 'true';
      authService.setAuthenticate(isAuth);
      resolve();
    })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService]
    },
  ]
};
