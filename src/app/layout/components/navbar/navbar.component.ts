import {
	CommonModule,
	isPlatformBrowser,
	NgOptimizedImage,
} from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

import { NavbarService } from '@app/core/services/navbar.service';
import { PreferencesService } from '@app/core/services/preferences.service';
import { CookieService } from '@app/core/services/cookie.service';

@Component({
	selector: 'abby-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule, NgOptimizedImage, SidebarModule],
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
	public isSettingsRoute: boolean = false;
	public showSidebar: boolean = false;
	public activeItem?: MenuItem;

	public get items() {
		return this.service.navbarItems;
	}

	public ngOnInit(): void {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				const routeWithoutQuery =
					(event as NavigationEnd).url.split(/[?#]/)[0] ?? '/';
				this.service.activeRoute = routeWithoutQuery;
				this.isHomeRoute = routeWithoutQuery === '/';
				this.isSettingsRoute = routeWithoutQuery === '/settings';
				this.activeItem = this.items.find((item) => item.styleClass)!;

				if (isPlatformBrowser(this.platformId)) {
					window.scrollTo(0, 0);
					this.cookieService.getCookieConsent();
				}
			});
	}

	public toggleSidebar(): void {
		this.showSidebar = !this.showSidebar;
	}
}
