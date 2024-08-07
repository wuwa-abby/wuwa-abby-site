import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class PreferencesService {
	constructor(private router: Router, private cookieService: CookieService) {
		this.reloadPref(true);
	}

	private userPreferences: { [key: string]: any } = {};

	private readonly defaultOnHomeClick: string = '/convenes';

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
