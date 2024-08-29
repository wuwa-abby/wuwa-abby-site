import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
	CommonModule,
	isPlatformBrowser,
	NgOptimizedImage,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

import { StorageService } from '@core/services/storage.service';

@Component({
	selector: 'abby-resonators',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NgOptimizedImage,

		ButtonModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
		SelectButtonModule,
		CardModule,
		ToolbarModule,
		TagModule,
		TooltipModule,
		DialogModule,
	],
	templateUrl: './resonators.component.html',
	styleUrl: './resonators.component.scss',
})
export class ResonatorsComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private storageService: StorageService,
		private activatedRoute: ActivatedRoute
	) {}

	public resonators: DisplayResonator[] = [];
	/* Filters */
	public readonly displayTypes: { label: string; value: number }[] = [
		{
			label: 'Resonators',
			value: 0,
		},
		{
			label: 'Weapons',
			value: 1,
		},
	];
	public selectedDisplayType = 0;

	/* UI state */
	public state: { [key: string]: any } = {
		isReadingMemory: true,
		showEditResonatorDialog: false,
	};

	public selectedResonator?: DisplayResonator;

	public ngOnInit(): void {
		this.loadResonators();
	}

	public editResonator(resonator: DisplayResonator): void {
		this.state['showEditResonatorDialog'] = true;
		this.selectedResonator = resonator;
	}

	private async loadResonators(): Promise<void> {
		this.resonators = (
			this.activatedRoute.snapshot.data['resonators'] as DisplayResonator[]
		)
			.map((r) => ({ ...r, imageName: r.name, isUnknown: false }))
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => a.element.localeCompare(b.element));

		if (!isPlatformBrowser(this.platformId)) return;

		this.state['isReadingMemory'] = true;

		const gachaTable = this.storageService.getGachaMemoryTable();
		const allResonators = await gachaTable
			.where('resourceType')
			.equalsIgnoreCase('resonator')
			.toArray();

		//TODO: Optimize this
		const seen = new Map<number, DisplayResonator>();
		for (const resonator of allResonators) {
			const knownResonator = seen.get(resonator.resourceId);

			if (knownResonator) {
				knownResonator.sequenceCount = Math.min(
					knownResonator.sequenceCount! + 1,
					6
				);

				if (new Date(resonator.time) < knownResonator.firstObtainedAt!) {
					knownResonator.firstObtainedAt = new Date(resonator.time);
				} else {
					knownResonator.lastObtainedAt = new Date(resonator.time);
				}
				continue;
			}

			const resonatorData = this.resonators.find(
				(r) =>
					r.id === resonator.resourceId ||
					r.name.toLowerCase() === resonator.name.toLowerCase()
			);

			if (!resonatorData) {
				console.warn(
					`Resonator ${resonator.name} not found in default data`,
					resonator
				);
				seen.set(resonator.resourceId, {
					id: resonator.resourceId,
					name: resonator.name,
					element: 'Unknown',
					rarity: resonator.qualityLevel,
					weaponOfChoice: 'Unknown',
					sequenceCount: 0,
					firstObtainedAt: new Date(resonator.time),
					lastObtainedAt: new Date(resonator.time),
					cardPoolType: resonator.cardPoolType,
					resourceId: resonator.resourceId,
					qualityLevel: resonator.qualityLevel,
					resourceType: resonator.resourceType,
					count: resonator.count,
					time: resonator.time,
					pity: resonator.pity,
					isUnknown: true,
					imageName: 'zhujue', // default female rover image
				});
				continue;
			}

			seen.set(resonator.resourceId, {
				...resonatorData,
				name: resonator.name,
				sequenceCount: 0,
				firstObtainedAt: new Date(resonator.time),
				cardPoolType: resonator.cardPoolType,
				resourceId: resonator.resourceId,
				qualityLevel: resonator.qualityLevel,
				resourceType: resonator.resourceType,
				count: resonator.count,
				time: resonator.time,
				pity: resonator.pity,
				imageName: resonator.name,
			});
		}

		this.resonators = Array.from(seen.values())
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => a.element.localeCompare(b.element));
		this.state['isReadingMemory'] = false;
	}
}

export interface DisplayResonator {
	id: number;
	name: string;
	element: string;
	rarity: number;
	weaponOfChoice: string;

	sequenceCount?: number;
	firstObtainedAt?: Date;
	lastObtainedAt?: Date;
	cardPoolType?: string;
	resourceId?: number;
	qualityLevel?: number;
	resourceType?: string;
	count?: number;
	time?: string;
	pity?: number;

	isUnknown: boolean;
	imageName: string;
}
