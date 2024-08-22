import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
	AfterViewInit,
	Component,
	Inject,
	OnInit,
	PLATFORM_ID,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Message } from 'primeng/api';
import { Observable } from 'rxjs';

import { StorageService } from '@core/services/storage.service';
import { calculateResourceDetails } from '@core/helpers/kuro.helper';
import { ConveneBanner } from '@core/types/convene-banner.type';
import { GachaMemoryTable } from '@core/model/gacha-history.table';

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
		ToastModule,
	],
	templateUrl: './convene.component.html',
	styleUrl: './convene.component.scss',
})
export class ConveneComponent implements OnInit, AfterViewInit {
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private storageService: StorageService,
		private activatedRoute: ActivatedRoute
	) {}

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

	public banners: DisplayBanner[] = [];
	public selectedBanner?: DisplayBanner;

	public get displayBanners(): DisplayBanner[] {
		return this.banners.filter((banner) => banner.endDate > new Date());
	}

	public ngOnInit(): void {
		this.activatedRoute.data.subscribe((data) => {
			const bannersApi = data['banners'] as Observable<ConveneBanner>[];
			bannersApi.forEach((banner) => {
				banner.subscribe((bannerData) => {
					bannerData.startDate = new Date(bannerData.startDate);
					bannerData.endDate = new Date(bannerData.endDate);
					this.banners.push(bannerData);
					if (!this.selectedBanner) {
						this.selectedBanner = bannerData;
					}
				});
			});
		});
	}

	public ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		this.loadHistory();
	}

	public selectBanner(banner: DisplayBanner): void {
		this.selectedBanner = banner;
	}

	private async loadHistory(): Promise<void> {
		const gachaMemoryStore = this.storageService.getGachaMemoryTable();
		const history = await gachaMemoryStore.toArray();

		this.banners.forEach((banner) => {
			const bannerHistory = history.filter(
				(item) => item.cardPoolType === banner.kuroBannerId
			);

			const quality4AndAbove = bannerHistory.filter(
				(item) => item.qualityLevel >= 4
			);
			for (let item of quality4AndAbove) {
				const a = calculateResourceDetails(item, bannerHistory, banner);
				if (!a) continue;

				const { wonFiftyFifty, pity } = a;
				const displayItem: DisplayItem = {
					...item,
					wonFiftyFifty,
					pity: pity,
				};
				banner.history = banner.history || [];
				banner.history.push(displayItem);
				banner.pity = banner.pity || { fiveStar: 1, fourStar: 1 };
				if (item.qualityLevel === 5) {
					banner.pity.fiveStar = pity;
				} else {
					banner.pity.fourStar = pity;
				}
			}
		});
	}
}

interface DisplayBanner extends ConveneBanner {
	pity?: { fiveStar: number; fourStar: number };
	history?: DisplayItem[];
}

interface DisplayItem extends GachaMemoryTable {
	wonFiftyFifty: boolean;
}
