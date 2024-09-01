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
import { SkeletonModule } from 'primeng/skeleton';

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
		SkeletonModule,
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
	public selectedDisplayType: number = 0;
	public searchQuery?: string;

	/* UI state */
	public state: { [key: string]: any } = {
		isReadingMemory: true,
		showEditResonatorDialog: false,
	};

	private _weapons: DisplayResonator[] = [];
	private _resonators: DisplayResonator[] = [];

	public get resonators(): DisplayResonator[] {
		return this._resonators.filter((r) =>
			this.searchQuery
				? r.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				: true
		);
	}

	public get weapons(): DisplayResonator[] {
		return this._weapons.filter((w) =>
			this.searchQuery
				? w.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				: true
		);
	}

	private set resonators(value: DisplayResonator[]) {
		this._resonators = value;
	}

	private set weapons(value: DisplayResonator[]) {
		this._weapons = value;
	}

	public ngOnInit(): void {
		this.loadResonators();
	}

	public async onDisplayTypeChange(): Promise<void> {
		this.searchQuery = undefined;

		if (this.selectedDisplayType && !this.weapons.length) {
			this.loadWeapons();
		}
	}

	private async loadResonators(): Promise<void> {
		this.resonators = (
			this.activatedRoute.snapshot.data['resonators'] as DisplayResonator[]
		)
			.map((r) => ({
				...r,
				imageName: r.name,
				isUnknown: false,
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => b.rarity! - a.rarity!);

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
					isCustom: false,
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
				isCustom: resonator.isCustom,
			});
		}

		this.resonators = Array.from(seen.values())
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => b.qualityLevel! - a.qualityLevel!);
		this.state['isReadingMemory'] = false;
	}

	private async loadWeapons(): Promise<void> {
		if (!isPlatformBrowser(this.platformId)) return;

		this.state['isReadingMemory'] = true;

		const gachaTable = this.storageService.getGachaMemoryTable();
		const allWeapons = await gachaTable
			.where('resourceType')
			.equalsIgnoreCase('weapon')
			.toArray();

		const seen = new Map<number, DisplayResonator>();
		for (const weapon of allWeapons) {
			const knownWeapon = seen.get(weapon.resourceId);

			if (knownWeapon) {
				knownWeapon.sequenceCount = Math.min(knownWeapon.sequenceCount! + 1, 6);

				if (new Date(weapon.time) < knownWeapon.firstObtainedAt!) {
					knownWeapon.firstObtainedAt = new Date(weapon.time);
				} else {
					knownWeapon.lastObtainedAt = new Date(weapon.time);
				}
				continue;
			}

			seen.set(weapon.resourceId, {
				id: weapon.resourceId,
				name: weapon.name,
				element: 'Unknown',
				rarity: weapon.qualityLevel,
				weaponOfChoice: 'Unknown',
				sequenceCount: 0,
				firstObtainedAt: new Date(weapon.time),
				lastObtainedAt: new Date(weapon.time),
				cardPoolType: weapon.cardPoolType,
				resourceId: weapon.resourceId,
				qualityLevel: weapon.qualityLevel,
				resourceType: weapon.resourceType,
				count: weapon.count,
				time: weapon.time,
				pity: weapon.pity,
				isUnknown: true,
				imageName: 'zhujue', //
				isCustom: false,
			});
		}

		this.weapons = Array.from(seen.values())
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => b.qualityLevel! - a.qualityLevel!);
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
	isCustom?: boolean;

	isUnknown: boolean;
	imageName: string;
}
