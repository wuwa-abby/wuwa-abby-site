import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastCloseEvent, ToastModule } from 'primeng/toast';

import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { CookieService } from '@core/services/cookie.service';

@Component({
  selector: 'abby-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private cookieService: CookieService) {}

  public title = 'WuWa Abby';

  public onToastClose(evt: ToastCloseEvent) {
    if (evt.message.data?.cookieConsent) {
      this.cookieService.set('cookieConsent', 'true');
    }
  }
}
