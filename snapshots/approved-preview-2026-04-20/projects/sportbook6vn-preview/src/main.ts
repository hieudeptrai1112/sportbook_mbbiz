import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { Sportbook6vnPreviewAppComponent } from './app/app.component';

bootstrapApplication(Sportbook6vnPreviewAppComponent, appConfig).catch((err) => console.error(err));
