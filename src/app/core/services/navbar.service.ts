import { Injectable } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class NavbarService {
	constructor() {}

	public activeRoute?: string;
	public navbarItems: MenuItem[] = [
		{
			label: 'Convenes',
			icon: 'bi bi-house',
			routerLink: 'convenes',
			styleClass:
				this.activeRoute === '/convenes'
					? 'fw-semibold text-decoration-underline'
					: '',
		},
		{
			label: 'Resonators',
			icon: 'pi pi-users',
			routerLink: 'resonators',
			styleClass:
				this.activeRoute === '/resonators'
					? 'fw-semibold text-decoration-underline'
					: '',
		},
		{
			label: 'Statistics',
			icon: 'pi pi-chart-bar',
			styleClass: this.activeRoute?.startsWith('/stats/')
				? 'fw-semibold text-decoration-underline'
				: '',
			items: [
				{
					label: 'My stats',
					icon: 'pi pi-user',
					routerLink: 'stats/personal',
					styleClass:
						this.activeRoute === '/stats/personal'
							? 'fw-semibold text-decoration-underline'
							: '',
				},
				{
					label: 'Global stats',
					icon: 'pi pi-globe',
					routerLink: 'stats/global',
					styleClass:
						this.activeRoute === '/stats/global'
							? 'fw-semibold text-decoration-underline'
							: '',
				},
				{
					label: 'Share',
					icon: 'pi pi-share-alt',
					routerLink: 'stats/share',
					styleClass:
						this.activeRoute === '/stats/share'
							? 'fw-semibold text-decoration-underline'
							: '',
				},
			],
		},
	];
}
