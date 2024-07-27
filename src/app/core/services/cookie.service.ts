import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(
    private cookieService: SsrCookieService,
    private toastService: MessageService
  ) {
    this.hasCookieConsent = !!this.cookieService.get('cookieConsent');
  }

  private hasCookieConsent: boolean = false;

  public get(key: string): string {
    return this.cookieService.get(key);
  }

  public set(key: string, value: any): void | string {
    if (!this.hasCookieConsent && key !== 'cookieConsent')
      return 'No cookie consent';

    this.cookieService.set(key, JSON.stringify(value));
  }

  public delete(key: string): void {
    this.cookieService.delete(key);
  }

  public getCookieConsent(): void {
    const cookie = this.cookieService.get('cookieConsent');
    if (cookie) return;

    this.toastService.add({
      severity: 'info',
      summary: 'Cookie Consent',
      detail:
        'This website uses cookies to ensure you get the best experience on our website.',
      sticky: true,
      data: { cookieConsent: true },
    });
  }
}
