import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
		private prefService: PreferencesService
	) {}

	public get theme(): string {
		return this.prefService.theme;
	}

	ngOnInit(): void {}

	public onToastClose(evt: ToastCloseEvent) {
		if (evt.message.data?.cookieConsent) {
			this.cookieService.set('cookieConsent', 'true');
		}
	}
}
