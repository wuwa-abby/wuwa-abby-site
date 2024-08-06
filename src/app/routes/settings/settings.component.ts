import { Component, OnInit } from '@angular/core';

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
	constructor(private prefService: PreferencesService) {}

	ngOnInit(): void {}

	public onChangeTheme(theme: string): void {
		this.prefService.set('theme', theme);
	}
}
