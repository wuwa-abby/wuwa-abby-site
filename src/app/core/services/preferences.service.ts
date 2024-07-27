import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(private router: Router, private cookieService: SsrCookieService) {
    const cookie = this.cookieService.get('userPreferences');

    if (cookie) this.userPreferences = JSON.parse(cookie);
    else this.setDefaultPreferences();
  }

  private userPreferences: Record<string, any> = {};

  private readonly defaultOnHomeClick: string = '/convenes';

  public onHomeClick(evt?: Event): void {
    console.debug('PreferencesService: onHomeClick', evt);
    if (evt) {
      evt.preventDefault();
    }

    this.router.navigate([
      this.userPreferences['onHomeClick'] ?? this.defaultOnHomeClick,
    ]);
  }

  public get(key: string): any {
    return this.userPreferences[key];
  }

  public set(key: string, value: any): void {
    this.userPreferences[key] = value;
    this.cookieService.set(
      'userPreferences',
      JSON.stringify(this.userPreferences)
    );
  }

  public remove(key: string): void {
    delete this.userPreferences[key];
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
