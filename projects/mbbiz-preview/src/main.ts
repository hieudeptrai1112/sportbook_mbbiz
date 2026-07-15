import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { MbbizPreviewAppComponent } from './app/app.component';

bootstrapApplication(MbbizPreviewAppComponent, appConfig).catch((err) => console.error(err));
