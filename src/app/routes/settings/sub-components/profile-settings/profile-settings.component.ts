import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { ProfileService } from '@core/services/profile.service';
import { UserProfileDTO } from '@core/types/user-profile.type';

import { KURO_HISTORY_URL_REGEX } from '@core/helpers/kuro.helper';

@Component({
	selector: 'abby-profile-settings',
	standalone: true,
	imports: [
		NgOptimizedImage,
		CommonModule,
		RouterModule,
		ReactiveFormsModule,

		PanelModule,
		ButtonModule,
		DataViewModule,
		SkeletonModule,
		TagModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
	],
	templateUrl: './profile-settings.component.html',
	styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent implements OnInit {
	constructor(private service: ProfileService) {}

	public profiles: UserProfileDTO[] = [];
	public isLoadingProfiles = true;
	public isLoadingSetActive = false;

	public createProfileForm: FormGroup = new FormGroup({
		profileName: new FormControl<string | undefined>(undefined, [
			Validators.required,
			Validators.maxLength(24),
		]),
		historyUrl: new FormControl<string | undefined>(undefined, [
			Validators.required,
			Validators.pattern(KURO_HISTORY_URL_REGEX),
		]),
	});

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

		this.isLoadingProfiles = false;
	}

	public async setActiveProfile(profile: UserProfileDTO): Promise<void> {
		this.isLoadingSetActive = true;
		await this.service.setActiveProfile(profile.profileId!);
		profile.isActive = true;
		this.isLoadingSetActive = false;
	}
}
