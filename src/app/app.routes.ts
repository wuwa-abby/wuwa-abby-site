import { Routes } from '@angular/router';

import { ConveneComponent } from '@routes/convene/convene.component';
import { conveneResolver } from '@routes/convene/convene.resolver';

import { ContributeComponent } from '@routes/contribute/contribute.component';
import { ContributeExistingComponent } from '@routes/contribute/sub-components/contribute-existing/contribute-existing.component';
import { ContributeNewComponent } from '@routes/contribute/sub-components/contribute-new/contribute-new.component';
import { MaintainResonatorComponent } from '@routes/contribute/sub-components/maintain-resonator/maintain-resonator.component';
import { CreateResonatorComponent } from '@routes/contribute/sub-components/create-resonator/create-resonator.component';
import { CreateWeaponComponent } from '@routes/contribute/sub-components/create-weapon/create-weapon.component';
import { MaintainWeaponComponent } from '@routes/contribute/sub-components/maintain-weapon/maintain-weapon.component';

import { GettingStartedComponent } from '@routes/getting-started/getting-started.component';
import { ImportComponent } from '@routes/import/import.component';
import { NotFoundComponent } from '@routes/not-found/not-found.component';
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
				path: 'existing',
				children: [
					{
						title: 'Wubby Update - Pick an item',
						path: '',
						component: ContributeExistingComponent,
					},
					{
						title: 'Wubby Update - Update Resonator data',
						path: 'resonators/:resonatorName',
						component: MaintainResonatorComponent,
					},
					{
						title: 'Wubby Update - Update Weapon data',
						path: 'weapons/:weaponName',
						component: MaintainWeaponComponent,
					},
				],
			},
			{
				path: 'new',
				children: [
					{
						title: 'Wubby Create - Pick an item',
						path: '',
						component: ContributeNewComponent,
					},
					{
						title: 'Create Resonator',
						path: 'resonators',
						component: CreateResonatorComponent,
					},
					{
						title: 'Create Weapon',
						path: 'weapons',
						component: CreateWeaponComponent,
					},
				],
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
