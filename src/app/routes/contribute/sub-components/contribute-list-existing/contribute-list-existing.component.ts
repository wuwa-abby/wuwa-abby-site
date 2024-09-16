import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'abby-contribute-list-existing',
	standalone: true,
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,
		NgOptimizedImage,

		BreadcrumbModule,
		CardModule,
	],
	templateUrl: './contribute-list-existing.component.html',
	styleUrl: './contribute-list-existing.component.scss',
})
export class ContributeListExistingComponent {
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
