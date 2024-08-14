import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class PreferencesService {
	constructor(
		private router: Router,
		private cookieService: CookieService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.reloadPref(true);
	}

	private userPreferences: { [key: string]: any } = {};

	private readonly defaultOnHomeClick: string = '/convenes';

	public get theme(): string {
		return this.get('theme');
	}

	public onHomeClick(evt?: Event): void {
		if (evt) {
			evt.preventDefault();
		}

		this.router.navigate([
			this.userPreferences['onHomeClick'] ?? this.defaultOnHomeClick,
		]);
	}

	public remove(key: string): void {
		this.reloadPref();

		delete this.userPreferences[key];
		this.cookieService.set('userPreferences', this.userPreferences);
	}

	public set(key: string, value: any): void {
		this.reloadPref();

		this.userPreferences[key] = value;
		this.cookieService.set('userPreferences', this.userPreferences);
	}

	public get(key: string): any {
		this.reloadPref();

		return this.userPreferences[key];
	}

	public updateTheme(theme: string): void {
		if (isPlatformBrowser(this.platformId)) {
			const themeLinkElem = document.getElementById('app-theme-link');
			if (themeLinkElem && theme) {
				themeLinkElem.setAttribute('href', `${theme}-theme.css`);
			}
		}
	}

	private reloadPref(set: boolean = false): void {
		const cookie = this.cookieService.get('userPreferences');

		if (cookie) {
			this.userPreferences = JSON.parse(cookie) as { [key: string]: any };
		} else if (set) this.setDefaultPreferences();
	}

	private setDefaultPreferences(): void {
		this.userPreferences = {
			onHomeClick: this.defaultOnHomeClick,
		};
		this.cookieService.set('userPreferences', this.userPreferences);
	}
}
