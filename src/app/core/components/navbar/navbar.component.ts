import {
	CommonModule,
	isPlatformBrowser,
	NgOptimizedImage,
} from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { filter } from 'rxjs';

import { NavbarService } from '@app/core/services/navbar.service';
import { PreferencesService } from '@app/core/services/preferences.service';
import { CookieService } from '@app/core/services/cookie.service';

@Component({
	selector: 'abby-navbar',
	standalone: true,
	imports: [CommonModule, MenubarModule, BadgeModule, NgOptimizedImage],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
	constructor(
		private service: NavbarService,
		private router: Router,
		public prefService: PreferencesService,
		private cookieService: CookieService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public isHomeRoute: boolean = false;

	public get items() {
		return this.service.navbarItems;
	}

	public ngOnInit(): void {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				const routeWithoutQuery = (event as NavigationEnd).url.split(/[?#]/)[0];
				this.service.activeRoute = routeWithoutQuery;
				this.isHomeRoute = routeWithoutQuery === '/';

				if (isPlatformBrowser(this.platformId)) {
					this.cookieService.getCookieConsent();
				}
			});
	}
}
