import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { allIcons } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideIcons(allIcons)],
};
