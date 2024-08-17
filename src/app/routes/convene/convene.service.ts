import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
	ConveneBanner,
	ConveneBannerSimple,
} from '@core/types/convene-banner.type';

@Injectable({
	providedIn: 'root',
})
export class ConveneService {
	constructor(private http: HttpClient) {}

	public getBannerHistory() {
		return this.http.get<ConveneBannerSimple[]>('raw/banners/banners.json');
	}
}
