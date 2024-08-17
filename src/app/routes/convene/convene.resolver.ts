import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import {
	ConveneBanner,
	ConveneBannerSimple,
} from '@core/types/convene-banner.type';

import { ConveneService } from './convene.service';

export const conveneResolver: ResolveFn<ConveneBannerSimple[]> = (
	route,
	state
) => {
	return inject(ConveneService).getBannerHistory();
};
