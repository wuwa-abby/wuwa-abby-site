import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'abby-contribute-list-existing',
	standalone: true,
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,

		BreadcrumbModule,
		TableModule,
		TagModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
		MultiSelectModule,
		DropdownModule,
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
