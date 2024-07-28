import { Routes } from '@angular/router';

import { GettingStartedComponent } from '@routes/getting-started/getting-started.component';
import { ImportComponent } from '@routes/import/import.component';

export const routes: Routes = [
	{
		title: 'Home',
		path: '',
		component: GettingStartedComponent,
	},
	{
		title: 'Import',
		path: 'import',
		component: ImportComponent,
	},

	/* 404 redirect */
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];
