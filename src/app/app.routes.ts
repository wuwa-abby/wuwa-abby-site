import { Routes } from '@angular/router';

import { ConveneComponent } from '@routes/convene/convene.component';
import { conveneResolver } from '@routes/convene/convene.resolver';

import { ContributeComponent } from '@routes/contribute/contribute.component';

import { GettingStartedComponent } from '@routes/getting-started/getting-started.component';
import { ImportComponent } from '@routes/import/import.component';
import { NotFoundComponent } from '@routes/not-found/not-found.component';
import { SettingsComponent } from '@routes/settings/settings.component';
import { ContributeExistingComponent } from '@routes/contribute/sub-components/contribute-existing/contribute-existing.component';
import { ContributeNewComponent } from '@routes/contribute/sub-components/contribute-new/contribute-new.component';

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

	/* Contributors */
	{
		title: 'Contribute',
		path: 'contribute',
		children: [
			{
				title: 'Contribute',
				path: '',
				component: ContributeComponent,
			},
			{
				title: 'Pick a file',
				path: 'existing',
				component: ContributeExistingComponent,
			},
			{
				title: 'Create new file',
				path: 'new',
				component: ContributeNewComponent,
			},
		],
	},

	/* 404 redirect */
	{
		path: '**',
		pathMatch: 'full',
		component: NotFoundComponent,
	},
];
