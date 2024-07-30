import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		MessageService,
		provideAnimations(),
		provideHighlightOptions({
			coreLibraryLoader: () => import('highlight.js/lib/core'),
			lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
			languages: {
				typescript: () => import('highlight.js/lib/languages/json'),
				css: () => import('highlight.js/lib/languages/bash'),
				xml: () => import('highlight.js/lib/languages/powershell'),
			},
		}),
	],
};
