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
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Message } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';

import { StorageService } from '@core/services/storage.service';
import { calculateResourceDetails } from '@core/helpers/kuro.helper';
import { ConveneBanner } from '@core/types/convene-banner.type';
import { GachaMemoryTable } from '@core/model/gacha-history.table';
import moment from 'moment';

@Component({
	selector: 'abby-convene',
	standalone: true,
	imports: [
		CommonModule,

		ButtonModule,
		PanelModule,
		MessagesModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
		ToastModule,
		ChartModule,
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
	public pityChartData?: Chart.ChartData;
	public pityChartOptions?: Chart.ChartOptions;

	public get displayBanners(): DisplayBanner[] {
		return this.banners
			.filter((banner) => banner.endDate > new Date())
			.sort((a, b) => a.type.localeCompare(b.type, 'en'));
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
						this.selectBanner(bannerData);
					}
				});
			});
		});

		this.configureChart();
	}

	public ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		// this.loadHistory()
		(async () => {
			await this.loadHistory();

			if (this.selectedBanner) {
				this.updateChart(this.selectedBanner);
			}
		})();
	}

	public selectBanner(banner: DisplayBanner): void {
		this.selectedBanner = banner;

		if (!banner.history) return;

		this.updateChart(banner);
	}

	private async loadHistory(): Promise<void> {
		const gachaMemoryStore = this.storageService.getGachaMemoryTable();
		const history = await gachaMemoryStore.toArray();

		this.banners.forEach((banner) => {
			const bannerHistory = history.filter(
				(item) => item.cardPoolType === banner.kuroBannerId
			);
			for (let item of bannerHistory) {
				banner.history = banner.history || [];

				const displayItem: DisplayItem = {
					...item,
					wonFiftyFifty: false,
					pity: 1,
				};

				const itemGachaDetail = calculateResourceDetails(
					item,
					bannerHistory,
					banner
				);
				if (!itemGachaDetail) {
					banner.history.push(displayItem);
					continue;
				}

				const { wonFiftyFifty, pity } = itemGachaDetail;
				displayItem.wonFiftyFifty = wonFiftyFifty;
				displayItem.pity = pity;

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

	private updateChart(banner: DisplayBanner): void {
		if (banner.chartData) {
			this.pityChartData = banner.chartData;
			const maxPulls = Math.max(
				...this.pityChartData.datasets.map((x) =>
					Math.max(...(x.data as number[]))
				)
			);
			this.pityChartOptions!.scales!['y']!.suggestedMax = maxPulls * 1.25;
			return;
		}

		const documentStyle = getComputedStyle(document.documentElement);

		const dateGroup = banner
			.history!.reduce((acc, item) => {
				const date = moment(item.time).format('MMM D');
				const lastGroup = acc[acc.length - 1];
				if (lastGroup && moment(lastGroup[0].time).format('MMM D') === date) {
					lastGroup.push(item);
				} else {
					acc.push([item]);
				}
				return acc;
			}, [] as DisplayItem[][])
			.sort((a, b) => b.length - a.length)
			.slice(0, 7);

		this.pityChartData = {
			labels: dateGroup.map((x) => moment(x[0].time).format('MMM D')),
			datasets: [
				{
					label: 'Total Pulls',
					data: dateGroup.flatMap((x) => x.length),
					tension: 0.4,
					borderColor: documentStyle.getPropertyValue('--blue-200'),
					borderDash: [5, 5],
					borderWidth: 1,
				},
				{
					label: '50/50 Wins',
					data: dateGroup.map((x) => x.filter((y) => y.wonFiftyFifty).length),
					tension: 0.4,
					borderColor: `${documentStyle.getPropertyValue('--green-300')}`,
					borderWidth: 2,
				},
				{
					label: '4★ Pulls',
					data: dateGroup.map(
						(x) => x.filter((y) => y.qualityLevel === 4).length
					),
					tension: 0.4,
					borderColor: `${documentStyle.getPropertyValue('--indigo-300')}`,
					borderWidth: 2,
				},
				{
					label: '5★ Pulls',
					data: dateGroup.map(
						(x) => x.filter((y) => y.qualityLevel === 5).length
					),
					tension: 0.4,
					borderColor: `${documentStyle.getPropertyValue('--yellow-500')}`,
					borderWidth: 2,
				},
			],
		};

		banner.chartData = this.pityChartData;
	}

	private configureChart(): void {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue(
			'--text-color-secondary'
		);
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

		this.pityChartOptions = {
			interaction: {
				intersect: false,
			},
			maintainAspectRatio: false,
			aspectRatio: 1.5,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
					fullSize: true,
				},
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
					title: {
						display: true,
						text: 'Date',
						color: textColorSecondary,
					},
				},
				y: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
				},
			},
		};
	}
}

interface DisplayBanner extends ConveneBanner {
	pity?: { fiveStar: number; fourStar: number };
	history?: DisplayItem[];
	chartData?: Chart.ChartData;
}

interface DisplayItem extends GachaMemoryTable {
	wonFiftyFifty: boolean;
}
