import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { filter } from 'rxjs';

import { NavbarService } from '@app/core/services/navbar.service';
import { PreferencesService } from '@app/core/services/preferences.service';

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
    public prefService: PreferencesService
  ) {}

  public isHomeRoute: boolean = false;

  public get items() {
    return this.service.navbarItems;
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.service.activeRoute = (event as NavigationEnd).url;
        this.isHomeRoute = this.service.activeRoute === '/';
        console.debug('NavbarComponent: activeRoute', this.service.activeRoute);
      });
  }
}
