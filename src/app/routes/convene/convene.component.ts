import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/api';

@Component({
	selector: 'abby-convene',
	standalone: true,
	imports: [
		CommonModule,
		ButtonModule,
		FieldsetModule,
		PanelModule,
		MessagesModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
	],
	templateUrl: './convene.component.html',
	styleUrl: './convene.component.scss',
})
export class ConveneComponent {
	constructor() {}

	public readonly version12Message: Message[] = [
		{
			key: 'version1.2',
			severity: 'warn',
			closable: false,
			summary: 'API change',
			detail:
				'With the release of version 1.2, Kuro games has removed the support for permanent convene URLs. This means Wubby will no longer be able to remember your convene URL.',
		},
	];
}
