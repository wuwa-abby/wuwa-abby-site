import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { ToastCloseEvent, ToastModule } from 'primeng/toast';

import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { CookieService } from '@core/services/cookie.service';
import { PreferencesService } from '@core/services/preferences.service';

@Component({
	selector: 'abby-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	constructor(
		private cookieService: CookieService,
		private prefService: PreferencesService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public title = 'WuWa Abby';

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			const themeLinkElem = document.getElementById('app-theme-link');
			const theme = this.prefService.get('theme');
			if (themeLinkElem && theme) {
				themeLinkElem.setAttribute('href', `${theme}-theme.css`);
			}
		}
	}

	public onToastClose(evt: ToastCloseEvent) {
		if (evt.message.data?.cookieConsent) {
			this.cookieService.set('cookieConsent', 'true');
		}
	}
}
