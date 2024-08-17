import { CommonModule, isPlatformBrowser } from '@angular/common';
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

import { StorageService } from '@core/services/storage.service';
import { calculateResourceDetails } from '@core/helpers/kuro.helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
	ConveneBanner,
	ConveneBannerSimple,
} from '@core/types/convene-banner.type';

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
	private rawBanners: ConveneBannerSimple[] = [];

	public ngOnInit(): void {
		this.activatedRoute.data.subscribe((data) => {
			this.rawBanners = data['banners'];
			console.debug('Convene banners', this.rawBanners);
		});
	}

	public ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

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
			const { pity } = calculateResourceDetails(item, poolItems) ?? {};
			item.pity = pity;
			console.debug(item);
		});
	}
}
