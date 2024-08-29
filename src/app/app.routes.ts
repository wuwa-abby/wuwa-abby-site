import { Routes } from '@angular/router';
import { ConveneComponent } from '@routes/convene/convene.component';
import { conveneResolver } from '@routes/convene/convene.resolver';

import { GettingStartedComponent } from '@routes/getting-started/getting-started.component';
import { ImportComponent } from '@routes/import/import.component';
import { NotFoundComponent } from '@routes/not-found/not-found.component';
import { ResonatorsComponent } from '@routes/resonators/resonators.component';
import { SettingsComponent } from '@routes/settings/settings.component';

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
	{
		title: 'Settings',
		path: 'settings',
		component: SettingsComponent,
	},
	{
		title: 'Convene',
		path: 'convenes',
		component: ConveneComponent,
		resolve: { banners: conveneResolver },
	},
	{
		title: 'Resonators',
		path: 'resonators',
		component: ResonatorsComponent,
	},

	/* 404 redirect */
	{
		path: '**',
		pathMatch: 'full',
		component: NotFoundComponent,
	},
];
