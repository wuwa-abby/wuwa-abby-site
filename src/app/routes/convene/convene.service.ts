import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import {
	ConveneBanner,
	ConveneBannerSimple,
} from '@core/types/convene-banner.type';

@Injectable({
	providedIn: 'root',
})
export class ConveneService {
	constructor(private http: HttpClient) {}

	public async getBannersAuto() {
		const history = await firstValueFrom(this.getBannerHistory());

		const apiCalls = history
			// .filter((x) => x.showUI) // do not auto-fetch banners that are not supposed to be shown
			.map((banner) => {
				return this.http.get<ConveneBanner>(`raw/banners/${banner.key}.json`);
			});

		return apiCalls;
	}

	public getBannerHistory() {
		return this.http.get<ConveneBannerSimple[]>('raw/banners/banners.json');
	}
}
