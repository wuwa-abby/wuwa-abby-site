import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

import { ProfileService } from '@core/services/profile.service';
import { UserProfileDTO } from '@core/types/user-profile.type';

@Component({
	selector: 'abby-profile-settings',
	standalone: true,
	imports: [
		NgOptimizedImage,
		CommonModule,
		RouterModule,

		PanelModule,
		ButtonModule,
		DataViewModule,
		SkeletonModule,
		TagModule,
	],
	templateUrl: './profile-settings.component.html',
	styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent implements OnInit {
	constructor(private service: ProfileService) {}

	public profiles: UserProfileDTO[] = [];
	public layout: 'list' | 'grid' = 'list';

	public ngOnInit(): void {
		this.getProfiles();
	}

	public async getProfiles(): Promise<void> {
		this.profiles = await this.service.getAllProfiles();

		for (const profile of this.profiles) {
			profile.historyUrl = this.service.parseHistoryUrl(
				profile.historyUrlBase64
			);
		}
	}

	public counterArray(n: number): number[] {
		return Array(n);
	}

	public getSeverity(profile: UserProfileDTO) {
		switch (profile.server) {
			case 'NA':
				return 'success';
			case 'EU':
				return 'warning';
			case 'KR':
				return 'danger';
			default:
				return 'secondary';
		}
	}
}
