import { Component, OnInit } from '@angular/core';

import { PreferencesService } from '@core/services/preferences.service';

@Component({
	selector: 'abby-settings',
	standalone: true,
	imports: [],
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
