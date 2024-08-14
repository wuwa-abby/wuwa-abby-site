import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';

import { PreferencesService } from '@core/services/preferences.service';

import { ProfileSettingsComponent } from './sub-components/profile-settings/profile-settings.component';

@Component({
	selector: 'abby-settings',
	standalone: true,
	imports: [
		FormsModule,

		ProfileSettingsComponent,

		PanelModule,
		TabViewModule,
		SelectButtonModule,
		FieldsetModule,
	],
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
	public activeTheme: string = this.prefService.get('theme') || 'dark';

	public readonly themeOptions: { label: string; value: string }[] = [
		{ label: 'Dark', value: 'dark' },
		{ label: 'Light', value: 'light' },
	];

	ngOnInit(): void {
		this.activeTabIdx =
			parseInt(this.route.snapshot.queryParams['watching']) || 0;
	}

	public onChangeTheme(theme: string): void {
		this.prefService.set('theme', theme);
		this.prefService.updateTheme(theme);
	}

	public onTabChange(event: any): void {
		this.activeTabIdx = event.index;

		this.router.navigate([], {
			queryParams: { watching: this.activeTabIdx },
			queryParamsHandling: 'merge',
		});
	}
}
