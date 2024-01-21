import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
//provideAnimations
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  // provider es un objeto que se puede inyectar en cualquier parte de la aplicación
  // providers: [provideRouter(routes)]
  //! esto es para que funcione las animaciones
  providers: [provideRouter(routes), provideAnimations(), provideAnimations()]
  // providers: [provideRouter(routes), provideHttpClient()]
};
