import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class PreferencesService {
	constructor(private router: Router, private cookieService: CookieService) {
		const cookie = this.cookieService.get('userPreferences');

		if (cookie)
			this.userPreferences = JSON.parse(cookie) as Record<string, any>;
		else this.setDefaultPreferences();
	}

	private userPreferences: Record<string, any> = {};

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
		delete this.userPreferences[key];
		this.cookieService.set(
			'userPreferences',
			JSON.stringify(this.userPreferences)
		);
	}

	public addUpdate(key: string, value: any): void {
		this.userPreferences[key] = value;
		this.cookieService.set(
			'userPreferences',
			JSON.stringify(this.userPreferences)
		);
	}

	private setDefaultPreferences(): void {
		this.userPreferences = {
			onHomeClick: this.defaultOnHomeClick,
		};
		this.cookieService.set(
			'userPreferences',
			JSON.stringify(this.userPreferences)
		);
	}
}
