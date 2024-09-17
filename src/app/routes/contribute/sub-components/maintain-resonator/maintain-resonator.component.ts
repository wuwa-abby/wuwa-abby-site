import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

import { ErrorOr } from '@core/types/error-or.type';
import { ItemDetail } from '@core/types/item-detail.type';

@Component({
	selector: 'abby-maintain-resonator',
	standalone: true,
	imports: [CommonModule, RouterModule, BreadcrumbModule, ButtonModule],
	templateUrl: './maintain-resonator.component.html',
	styleUrl: './maintain-resonator.component.scss',
})
export class MaintainResonatorComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute) {
		this.createBreadcrumbs();
	}

	public breadcrumbs: MenuItem[] = [];
	public resonatorDetail!: ErrorOr<ItemDetail>;

	public ngOnInit(): void {
		this.resonatorDetail = this.activatedRoute.snapshot.data['resonator'];
	}

	private createBreadcrumbs() {
		this.breadcrumbs = [
			{ label: 'Contribute', routerLink: '/contribute' },
			{ label: 'Items', routerLink: '/contribute/existing' },
			{ label: 'Update Resonator' },
		];
	}
}
