import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

import { PreferencesService } from '@core/services/preferences.service';

@Component({
	selector: 'abby-settings',
	standalone: true,
	imports: [NgOptimizedImage, PanelModule, ButtonModule, RouterModule],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
	constructor(private prefService: PreferencesService) {}

	ngOnInit(): void {}

	public onChangeTheme(theme: string): void {
		this.prefService.set('theme', theme);
	}

	public createProfile(): void {
		console.log('create profile');
	}
}
