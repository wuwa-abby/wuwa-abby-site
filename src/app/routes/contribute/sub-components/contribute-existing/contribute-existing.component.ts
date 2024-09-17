import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';

import { DisplayResonator } from '@routes/resonators/resonators.component';
import { ResonatorsService } from '@routes/resonators/resonators.service';

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
		ButtonModule,
		SkeletonModule,
		DropdownModule,
	],
	templateUrl: './contribute-existing.component.html',
	styleUrl: './contribute-existing.component.scss',
})
export class ContributeExistingComponent implements OnInit {
	constructor(private resonatorService: ResonatorsService) {
		this.createBreadcrumbs();
	}

	public readonly updateTypeOptions: { label: string; value: string }[] = [
		{ label: 'Resonators', value: 'Resonator' },
		{ label: 'Weapons', value: 'Weapon' },
		{ label: 'Banners', value: 'Banner' },
	];

	public breadcrumbs: MenuItem[] = [];
	public updateType!: 'Resonator' | 'Weapon' | 'Banner';

	public resonators: DisplayResonator[] = [];
	public weapons: any[] = [];
	public banners: any[] = [];

	ngOnInit(): void {
		this.changeUpdateType('Resonator');
	}

	public changeUpdateType(type: 'Resonator' | 'Weapon' | 'Banner') {
		this.updateType = type;

		if (type === 'Resonator' && !this.resonators.length) {
			this.resonatorService.getResonators().subscribe({
				next: (resonators) => {
					this.resonators = resonators
						.map(
							(r) =>
								({
									...r,
									imageName: r.name.replace(/ /g, '-').toLowerCase(),
								} as DisplayResonator)
						)
						.sort((a, b) => a.name.localeCompare(b.name))
						.sort((a, b) => b.rarity - a.rarity);
				},
				error: (error) => {
					console.error('Error getting resonators', error);
				},
			});
		}
	}

	private createBreadcrumbs() {
		this.breadcrumbs = [
			{ label: 'Contribute', routerLink: '/contribute' },
			{ label: 'Make changes', routerLink: '/contribute/existing' },
		];
	}
}
