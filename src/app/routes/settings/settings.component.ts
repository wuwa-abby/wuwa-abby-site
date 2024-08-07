import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { PreferencesService } from '@core/services/preferences.service';

import { ProfileSettingsComponent } from './sub-components/profile-settings/profile-settings.component';

@Component({
	selector: 'abby-settings',
	standalone: true,
	imports: [PanelModule, TabViewModule, ProfileSettingsComponent],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
	constructor(
		private prefService: PreferencesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public activeTabIdx: number = 0;

	ngOnInit(): void {
		this.activeTabIdx =
			parseInt(this.route.snapshot.queryParams['watching']) || 0;
	}

	public onChangeTheme(theme: string): void {
		this.prefService.set('theme', theme);
	}

	public onTabChange(event: any): void {
		this.activeTabIdx = event.index;

		this.router.navigate([], {
			queryParams: { watching: this.activeTabIdx },
			queryParamsHandling: 'merge',
		});
	}
}
