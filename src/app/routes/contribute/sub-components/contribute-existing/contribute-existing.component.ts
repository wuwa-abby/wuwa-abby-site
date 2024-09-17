import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'abby-contribute-existing',
	standalone: true,
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,
		NgOptimizedImage,

		BreadcrumbModule,
		CardModule,
	],
	templateUrl: './contribute-existing.component.html',
	styleUrl: './contribute-existing.component.scss',
})
export class ContributeExistingComponent {
	constructor() {
		this.createBreadcrumbs();
	}

	public breadcrumbs: MenuItem[] = [];

	private createBreadcrumbs() {
		this.breadcrumbs = [
			{ label: 'Contribute', routerLink: '/contribute' },
			{ label: 'Make changes', routerLink: '/contribute/existing' },
		];
	}
}
