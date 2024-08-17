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
	private banners: ConveneBanner[] = [];

	public ngOnInit(): void {
		this.activatedRoute.data.subscribe((data) => {
			const bannersApi = data['banners'] as Observable<ConveneBanner>[];
			bannersApi.forEach((banner) => {
				banner.subscribe((bannerData) => {
					bannerData.startDate = new Date(bannerData.startDate);
					bannerData.endDate = new Date(bannerData.endDate);
					this.banners.push(bannerData);
				});
			});
		});
	}

	public ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		console.debug('ConveneComponent: ngAfterViewInit', this.banners);
		this.loadHistory();
	}

	private async loadHistory(): Promise<void> {
		const gachaMemoryStore = this.storageService.getGachaMemoryTable();
		const history = await gachaMemoryStore.toArray();

		const quality4AndAbove = history.filter((item) => item.qualityLevel >= 5);
		quality4AndAbove.forEach((item) => {
			const poolItems = history.filter(
				(poolItem) => poolItem.cardPoolType === item.cardPoolType
			);
			const banner = this.banners.find(
				(b) =>
					b.kuroBannerId == item.cardPoolType &&
					b.startDate <= new Date(item.time) &&
					b.endDate >= new Date(item.time)
			);

			if (banner) {
				const { pity, wonFiftyFifty } =
					calculateResourceDetails(item, poolItems, banner) ?? {};
				item.pity = pity;
				console.debug(item, wonFiftyFifty);
			} else {
				console.debug('Banner not found for', item);
			}
		});
	}
}
