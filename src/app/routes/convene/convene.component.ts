import {
	CommonModule,
	isPlatformBrowser,
	NgOptimizedImage,
} from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
	AfterViewInit,
	Component,
	HostListener,
	Inject,
	OnInit,
	PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { PickListModule, PickListMoveToTargetEvent } from 'primeng/picklist';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import moment from 'moment';

import { CookieService } from '@core/services/cookie.service';
import { StorageService } from '@core/services/storage.service';
import { calculateResourceDetails } from '@core/helpers/kuro.helper';
import { getPityClass } from '@core/helpers/ui.helper';
import { ConveneBanner } from '@core/types/convene-banner.type';
import { GachaMemoryTable } from '@core/model/gacha-history.table';

@Component({
	selector: 'abby-convene',
	standalone: true,
	imports: [
		CommonModule,
		NgOptimizedImage,
		FormsModule,
		RouterModule,

		ButtonModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
		ChartModule,
		TooltipModule,
		SelectButtonModule,
		SkeletonModule,
		ProgressBarModule,
		SidebarModule,
		DividerModule,
		DialogModule,
		PickListModule,
	],
	templateUrl: './convene.component.html',
	styleUrl: './convene.component.scss',
})
export class ConveneComponent implements OnInit, AfterViewInit {
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private storageService: StorageService,
		private activatedRoute: ActivatedRoute,
		private cookieService: CookieService
	) {}

	public readonly qualityLevels = [
		{ label: '5★', value: 5 },
		{ label: '4★', value: 4 },
	];
	private readonly now: Date = new Date();

	public selectedBanners: DisplayBanner[] = [];
	public activeBanner?: DisplayBanner;
	public bannersToLoad: string[] = [];
	public isMobile?: boolean;

	public bannerPickListTrackBy = (index: number, item: DisplayBanner) =>
		item.key;

	/* Chart */
	public pityChartData?: Chart.ChartData;
	public pityChartOptions?: Chart.ChartOptions;
	/* Stats */
	public selectedQualityLevel: number = 5;
	/* Sidebars */
	public displayPickBannerSidebar: boolean = false;
	/* Dialog */
	public displayBannerFilterDialog: boolean = false;

	private availableBanners: DisplayBanner[] = [];

	public get availableBannersFiltered(): DisplayBanner[] {
		return this.availableBanners.filter(
			(x) => !this.selectedBanners.includes(x)
		);
	}

	public get displayBanners(): DisplayBanner[] {
		return this.selectedBanners.sort((a, b) =>
			a.type.localeCompare(b.type, 'en')
		);
	}

	public get selectedBannerHistory(): DisplayItem[] {
		return this.activeBanner?.history || [];
	}

	public get selectedQualityBannerHistory(): DisplayItem[] {
		return (
			this.selectedBannerDurationHistory.filter((x) => x.qualityLevel >= 4) ||
			[]
		)
			.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
			.slice(0, 20);
	}

	public get selectedBannerDurationHistory(): DisplayItem[] {
		return this.activeBanner
			? this.activeBanner.history?.filter(
					(x) =>
						new Date(x.time) >= this.activeBanner!.startDate &&
						new Date(x.time) <= this.activeBanner!.endDate
			  ) || []
			: [];
	}

	public ngOnInit(): void {
		this.isMobileCheck();
		this.retrieveUserBanners();

		this.loadBanners();
		this.configureChart();
	}

	public ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		this.loadHistory().then(() => {
			if (this.activeBanner) {
				this.updateChart(this.activeBanner);
				this.calculateStats();
			}
		});
	}

	public selectBanner(banner: DisplayBanner): void {
		this.activeBanner = banner;

		if (!banner.history) return;

		this.updateChart(banner);
		this.calculateStats();
	}

	public getPityClass = getPityClass;

	public updateBannerPreferences(evt: PickListMoveToTargetEvent) {
		this.cookieService.set(
			'conveneBanners',
			this.selectedBanners.map((b) => b.key)
		);
	}

	private async loadHistory(): Promise<void> {
		const gachaMemoryStore = this.storageService.getGachaMemoryTable();
		const history = await gachaMemoryStore.toArray();

		for (let i = 0; i < this.availableBanners.length; i++) {
			const banner = this.availableBanners[i];
			let previousBanner: DisplayBanner | undefined;
			if (i > 0) {
				previousBanner = this.availableBanners[i - 1];
			}

			banner.isExpired = banner.endDate < this.now;

			const bannerHistory = history.filter(
				(item) => item.cardPoolType === banner.kuroBannerId
			);

			for (let j = 0; j < bannerHistory.length; j++) {
				const item = bannerHistory[j];
				banner.history = banner.history || [];

				const displayItem: DisplayItem = {
					...item,
					wonFiftyFifty: false,
					pity: 1,
				};

				const itemGachaDetail = calculateResourceDetails(
					item,
					bannerHistory,
					banner,
					previousBanner
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
		}
	}

	private updateChart(banner: DisplayBanner): void {
		if (!isPlatformBrowser(this.platformId)) return;

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
		const dateGroup = this.selectedBannerDurationHistory
			.reduce((acc, item) => {
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
		if (!isPlatformBrowser(this.platformId)) return;

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
			aspectRatio: 1.2,
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

	private async calculateStats(): Promise<void> {
		if (!this.activeBanner || this.activeBanner.stats) return;

		const totalPulls = this.selectedBannerDurationHistory.length;

		/* 5★ count, avg pity, no. of 5050 won */
		const fiveStarStats = this.selectedBannerDurationHistory
			.filter((x) => x.qualityLevel === 5)
			.reduce(
				(acc, item) => {
					acc[0]++;
					acc[1] += item.pity || 0;
					if (item.wonFiftyFifty) {
						acc[2]++;
					}
					return acc;
				},
				[0, 0, 0]
			);

		/* 4★ count, avg pity, no. of 5050 won */
		const fourStarStats = this.selectedBannerDurationHistory
			.filter((x) => x.qualityLevel === 4)
			.reduce(
				(acc, item) => {
					acc[0]++;
					acc[1] += item.pity || 0;
					if (item.wonFiftyFifty) {
						acc[2]++;
					}
					return acc;
				},
				[0, 0, 0]
			);

		this.activeBanner.stats = {
			totalPulls,
			fiveStar: {
				count: fiveStarStats[0],
				avgPity: Math.round(fiveStarStats[1] / fiveStarStats[0]),
				wonFiftyFifty: fiveStarStats[2],
				qualityPercentage: (fiveStarStats[0] / totalPulls) * 100,
			},
			fourStar: {
				count: fourStarStats[0],
				avgPity: Math.round(fourStarStats[1] / fourStarStats[0]),
				wonFiftyFifty: fourStarStats[2],
				qualityPercentage: (fourStarStats[0] / totalPulls) * 100,
			},
		};
	}

	private isMobileCheck(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.isMobile = window.innerWidth <= 992;
		}
	}

	@HostListener('window:resize', ['$event'])
	public onResize(event: Event): void {
		this.isMobile = window.innerWidth <= 992;
	}

	private retrieveUserBanners(): void {
		const userBanners = this.cookieService.get('conveneBanners');
		if (!userBanners) return;

		this.bannersToLoad = JSON.parse(userBanners) as string[];
	}

	private loadBanners(): void {
		let shouldUseDefault = this.bannersToLoad.length === 0;

		this.activatedRoute.data.subscribe((data) => {
			const bannersApi = data['banners'] as Observable<ConveneBanner>[];
			bannersApi.forEach((banner) => {
				banner.subscribe((bannerData) => {
					bannerData.startDate = new Date(bannerData.startDate);
					bannerData.endDate = new Date(bannerData.endDate);

					const displayBanner = {
						...bannerData,
						featuredString: `${bannerData.featuredResources.fiveStar.join(
							', '
						)},${bannerData.featuredResources.fourStar.join(', ')}`,
					};

					if (shouldUseDefault && displayBanner.showUI) {
						this.selectedBanners.push(displayBanner);
						if (!this.activeBanner) {
							this.selectBanner(displayBanner);
						}
					} else if (this.bannersToLoad.includes(displayBanner.key)) {
						this.selectedBanners.push(displayBanner);

						if (!this.activeBanner) {
							this.selectBanner(displayBanner);
						}
					}

					this.availableBanners.push(displayBanner);
				});
			});
		});
	}
}

interface DisplayBanner extends ConveneBanner {
	pity?: { fiveStar: number; fourStar: number };
	history?: DisplayItem[];
	chartData?: Chart.ChartData;
	stats?: DisplayStats;
	isExpired?: boolean;
	featuredString: string;
}

interface DisplayItem extends GachaMemoryTable {
	wonFiftyFifty: boolean;
}

interface DisplayStats {
	totalPulls: number;
	fiveStar: {
		count: number;
		avgPity: number;
		wonFiftyFifty: number;
		qualityPercentage: number;
	};
	fourStar: {
		count: number;
		avgPity: number;
		wonFiftyFifty: number;
		qualityPercentage: number;
	};
}
