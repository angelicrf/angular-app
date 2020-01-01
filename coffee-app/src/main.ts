import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('ngsw-worker.js')
        .then(r => console.log('the service worker is: ', r)).catch(err => {
          console.log('the error for the service worker is:', err);
      });
    }
  })
  .catch(err => console.error(err));
